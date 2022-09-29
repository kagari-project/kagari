import { DynamicModule, forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import {
  AsyncAuthModuleOptions,
  AuthModuleOptions,
  ComposeAccessTokenPayload,
  ComposeRefreshTokenPayload,
} from '../types';
import { JwtAuthService } from './jwt-auth.service';
import { JWT_AUTH_MODULE_OPTIONS } from '../constants';

import { ExtraOptions } from './types';

@Module({})
export class JwtAuthModule {
  static forRoot(
    options: AuthModuleOptions<unknown, ExtraOptions>,
  ): DynamicModule {
    return {
      module: JwtAuthModule,
      imports: [PassportModule, JwtModule.register(options.jwt)],
      providers: [
        {
          provide: JWT_AUTH_MODULE_OPTIONS,
          useValue: options,
        },
        ...this.createProviders(),
      ],
      exports: [...this.createExports()],
    };
  }

  static forRootAsync(
    options: AsyncAuthModuleOptions<unknown, ExtraOptions>,
  ): DynamicModule {
    return {
      global: true,
      module: JwtAuthModule,
      imports: [
        PassportModule,
        JwtModule.registerAsync({
          inject: [JWT_AUTH_MODULE_OPTIONS],
          useFactory: (options: AuthModuleOptions<unknown, ExtraOptions>) =>
            options.jwt,
        }),
      ],
      providers: [
        {
          inject: options.inject,
          provide: JWT_AUTH_MODULE_OPTIONS,
          useFactory: options.useFactory,
        },
        ...this.createProviders(),
      ],
      exports: [...this.createExports()],
    };
  }

  private static createProviders() {
    return [JwtAuthService];
  }

  private static createExports() {
    return [JWT_AUTH_MODULE_OPTIONS, JwtAuthService];
  }
}
