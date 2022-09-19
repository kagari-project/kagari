import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AUTH_MODULE_OPTIONS } from './constants';
import { AsyncAuthModuleOptions, AuthModuleOptions } from './types';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({})
export class JwtAuthModule {
  static forRoot<T>(
    options: AuthModuleOptions<T, { jwt: JwtModuleOptions }>,
  ): DynamicModule {
    return {
      module: JwtAuthModule,
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

  static forRootAsync<T>(
    options: AsyncAuthModuleOptions<T, { jwt: JwtModuleOptions }>,
  ): DynamicModule {
    return {
      ...options,
      module: JwtAuthModule,
      imports: [
        PassportModule,
        JwtModule.registerAsync({
          inject: [{ provide: AUTH_MODULE_OPTIONS }],
          useFactory(options: AuthModuleOptions<T, { jwt: JwtModuleOptions }>) {
            return options.jwt;
          },
        }),
      ],
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: AUTH_MODULE_OPTIONS,
          useFactory: options.useFactory,
        },
      ],
    };
  }
}
