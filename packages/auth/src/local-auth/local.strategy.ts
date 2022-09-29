import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';
import { LocalAuthService } from './local-auth.service';
import { LOCAL_AUTH_MODULE_OPTIONS } from '../constants';
import { AuthModuleOptions } from '../types';
import { IStrategyOptions } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: LocalAuthService,
    @Inject(LOCAL_AUTH_MODULE_OPTIONS)
    private options: AuthModuleOptions<
      unknown,
      { strategyOptions?: IStrategyOptions }
    >,
  ) {
    super(options.strategyOptions || {});
  }

  async validate(username: string, password: string) {
    return this.authService.validate({ username, password });
  }
}
