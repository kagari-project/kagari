import {
  DynamicModule,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AUTH_MODULE_OPTIONS } from './constants';
import { AsyncAuthModuleOptions, AuthModuleOptions } from './types';
import { LocalStrategy } from './strategies/local.strategy';
import * as session from 'express-session';

@Module({})
export class LocalAuthModule implements NestModule {
  constructor(
    @Inject(AUTH_MODULE_OPTIONS)
    private options: AuthModuleOptions<
      unknown,
      { session: session.SessionOptions }
    >,
  ) {}

  static forRoot<T>(
    options: AuthModuleOptions<T, { session: session.SessionOptions }>,
  ): DynamicModule {
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

  static forRootAsync<T>(
    options: AsyncAuthModuleOptions<T, { session: session.SessionOptions }>,
  ): DynamicModule {
    return {
      ...options,
      module: LocalAuthModule,
      providers: [
        AuthService,
        LocalStrategy,
        {
          provide: AUTH_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
      exports: [AuthService],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(session(this.options.session)).forRoutes('*');
  }
}
