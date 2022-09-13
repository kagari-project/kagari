import { DynamicModule, Module } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AUTH_MODULE_OPTIONS } from './constants';
import { AuthModuleOptions } from './types';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({})
export class AuthModule {
  static register<T>(
    options: AuthModuleOptions<T, { jwt?: JwtModuleOptions }>,
  ): DynamicModule {
    if (options.strategy.name === JwtStrategy.name) {
      return this.registerJwt(
        options as AuthModuleOptions<T, { jwt: JwtModuleOptions }>,
      );
    }

    return this.registerLocal(options as AuthModuleOptions<T>);
  }

  private static registerLocal<T>(
    options: AuthModuleOptions<T>,
  ): DynamicModule {
    return {
      module: AuthModule,
      imports: [PassportModule],
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

  private static registerJwt<T>(
    options: AuthModuleOptions<T, { jwt: JwtModuleOptions }>,
  ): DynamicModule {
    return {
      module: AuthModule,
      imports: [PassportModule, JwtModule.register(options.jwt)],
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: AUTH_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [AuthService],
    };
  }
}
