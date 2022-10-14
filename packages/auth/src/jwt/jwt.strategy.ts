import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';
import { JWT_AUTH_MODULE_OPTIONS } from '../constants';
import { AuthModuleOptions } from '../types';
import { ExtraOptions } from './types';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(JWT_AUTH_MODULE_OPTIONS)
    private options: AuthModuleOptions<unknown, ExtraOptions>,
  ) {
    super({
      ...options.jwt,
      secretOrKey: options.jwt.secret,
      jwtFromRequest: ExtractJwt.fromHeader('x-token'),
    });
  }

  /**
   * extracted payload from jwt token, compose an object on req.user
   * @param payload
   */
  async validate(payload: any) {
    return payload;
  }
}
