import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtAuthService } from '../services/jwt-auth.service';
import { AUTH_MODULE_OPTIONS } from '../constants';
import { AsyncAuthModuleOptions, AuthModuleOptions } from '../types';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthService } from '../services/auth.service';

@Module({})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class JwtAuthFacade {
  static forRootAsync<T>(
    options: AsyncAuthModuleOptions<T, { jwt: JwtModuleOptions }>,
  ): DynamicModule {
    const OptionsProvider: Provider = {
      inject: options.inject ?? [],
      provide: AUTH_MODULE_OPTIONS,
      useFactory: options.useFactory,
    };
    return {
      module: JwtAuthFacade,
      providers: [OptionsProvider],
      exports: [AUTH_MODULE_OPTIONS],
      imports: options.imports ?? [],
      // todo 待优化
      global: true,
    };
  }
}

@Module({})
export class JwtAuthModule {
  static forRoot<T>(
    options: AuthModuleOptions<T, { jwt: JwtModuleOptions }>,
  ): DynamicModule {
    return {
      module: JwtAuthModule,
      imports: [PassportModule, JwtModule.register(options.jwt)],
      providers: [
        JwtAuthService,
        JwtStrategy,
        LocalStrategy,
        {
          provide: AUTH_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [JwtAuthService],
    };
  }

  static forRootAsync<T>(
    options: AsyncAuthModuleOptions<T, { jwt: JwtModuleOptions }>,
  ): DynamicModule {
    const OptionsProvider = {
      inject: options.inject ?? [],
      provide: AUTH_MODULE_OPTIONS,
      useFactory: options.useFactory,
    };
    return {
      module: JwtAuthModule,
      imports: [
        PassportModule,
        // todo inject options
        JwtAuthFacade.forRootAsync(options),
        JwtModule.registerAsync({
          inject: [AUTH_MODULE_OPTIONS],
          useFactory(options: AuthModuleOptions<T, { jwt: JwtModuleOptions }>) {
            return options.jwt;
          },
        }),
      ],
      providers: [
        OptionsProvider,
        JwtAuthService,
        AuthService,
        JwtStrategy,
        LocalStrategy,
      ],
      exports: [JwtAuthService, AUTH_MODULE_OPTIONS],
    };
  }
}
