import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';
import { LocalAuthService } from './local-auth.service';
import { LOCAL_AUTH_MODULE_OPTIONS } from '../constants';
import { AuthModuleOptions } from '../types';
import { IStrategyOptions } from 'passport-local';
import { Request } from 'express';
import { ObjectLiteral } from '@kagari/database';

/**
 * copy from passport-local
 * @param obj
 * @param field
 */
function lookup(obj: any, field: string) {
  if (!obj) {
    return null;
  }
  const chain = field.split(']').join('').split('[');
  for (let i = 0, len = chain.length; i < len; i++) {
    const prop = obj[chain[i]];
    if (typeof prop === 'undefined') {
      return null;
    }
    if (typeof prop !== 'object') {
      return prop;
    }
    obj = prop;
  }
  return null;
}

type WithFieldOptions = {
  _usernameField: string;
  _passwordField: string;
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: LocalAuthService,
    @Inject(LOCAL_AUTH_MODULE_OPTIONS)
    private options: AuthModuleOptions<
      ObjectLiteral,
      { strategyOptions?: IStrategyOptions }
    >,
  ) {
    super(options.strategyOptions || {});
  }

  async validate(username: string, password: string) {
    return this.authService.validate({ username, password });
  }

  authenticate(req: Request, options?: unknown) {
    options = options || {};
    const username =
      lookup(req.body, (this as unknown as WithFieldOptions)._usernameField) ||
      lookup(req.query, (this as unknown as WithFieldOptions)._usernameField);
    const password =
      lookup(req.body, (this as unknown as WithFieldOptions)._passwordField) ||
      lookup(req.query, (this as unknown as WithFieldOptions)._passwordField);
    if (typeof this.options.validate === 'function') {
      this.options.validate({ username, password });
    }
    return super.authenticate(req, options);
  }
}
