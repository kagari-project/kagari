import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, DataSource } from '@kagari/database';
import { AUTH_MODULE_OPTIONS } from '../constants';
import { AuthModuleOptions, Credential } from '../types';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private datasource: DataSource,
    @Inject(AUTH_MODULE_OPTIONS) private options: AuthModuleOptions,
  ) {}

  async validate(credential: Credential) {
    const repo = this.datasource.getRepository(this.options.entity);
    return this.options.validate(repo, credential);
  }
}
