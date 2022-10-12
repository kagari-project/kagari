import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, DataSource } from '@kagari/database';
import { LOCAL_AUTH_MODULE_OPTIONS } from '../constants';
import { AuthModuleOptions } from '../types';
import { Credential } from '../types';

@Injectable()
export class LocalAuthService {
  constructor(
    @InjectDataSource() private datasource: DataSource,
    @Inject(LOCAL_AUTH_MODULE_OPTIONS) private options: AuthModuleOptions,
  ) {}

  async validate(credential: Credential) {
    const repo = this.datasource.getRepository(this.options.entity);
    return this.options.verify(repo, credential);
  }
}
