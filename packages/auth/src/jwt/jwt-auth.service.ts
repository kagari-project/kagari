import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, DataSource } from '@kagari/database';
import { JWT_AUTH_MODULE_OPTIONS } from '../constants';
import { AuthModuleOptions, Credential } from '../types';
import { JwtService } from '@nestjs/jwt';
import { ExtraOptions } from './types';
import { ObjectLiteral } from '@kagari/database';

@Injectable()
export class JwtAuthService {
  constructor(
    @InjectDataSource() private datasource: DataSource,
    @Inject(JWT_AUTH_MODULE_OPTIONS)
    private options: AuthModuleOptions<ObjectLiteral, ExtraOptions>,
    private jwtService: JwtService,
  ) {}

  async validate(credential: Credential) {
    const repo = this.datasource.getRepository(this.options.entity);
    return this.options.verify(repo, credential);
  }

  async signature(user: unknown) {
    return {
      accessToken: this.jwtService.sign(this.options.payload.access(user)),
      refreshToken: this.jwtService.sign(this.options.payload.refresh(user)),
    };
  }
}
