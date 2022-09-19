import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AUTH_MODULE_OPTIONS } from './constants';
import { AsyncAuthModuleOptions, AuthModuleOptions } from './types';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({})
export class LocalAuthModule {
  static forRoot<T>(options: AuthModuleOptions<T>): DynamicModule {
    return {
      imports: [PassportModule],
      module: LocalAuthModule,
      providers: [
        AuthService,
        LocalStrategy,
        {
          provide: AUTH_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [AuthService],
    };
  }

  static forRootAsync<T>(options: AsyncAuthModuleOptions<T>): DynamicModule {
    return {
      ...options,
      module: LocalAuthModule,
    };
  }
}
