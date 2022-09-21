import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, DataSource } from '@kagari/database';
import { AUTH_MODULE_OPTIONS } from '../constants';
import { AuthModuleOptions, Credential } from '../types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(
    @InjectDataSource() private datasource: DataSource,
    @Inject(AUTH_MODULE_OPTIONS) private options: AuthModuleOptions,
    private jwtService: JwtService,
  ) {}

  async validate(credential: Credential) {
    const repo = this.datasource.getRepository(this.options.entity);
    return this.options.validate(repo, credential);
  }

  signature(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
