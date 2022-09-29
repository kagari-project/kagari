import {
  DynamicModule,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthService } from './local-auth.service';
import { LOCAL_AUTH_MODULE_OPTIONS } from '../constants';
import { AsyncAuthModuleOptions, AuthModuleOptions } from '../types';
import { LocalStrategy } from './local.strategy';
import * as session from 'express-session';
import * as passport from 'passport';
import { LocalSerializer } from './local.serializer';
import { IStrategyOptions } from 'passport-local';

type ExtraOptions = {
  session: session.SessionOptions;
  strategyOptions?: IStrategyOptions;
};

@Module({})
export class LocalAuthModule implements NestModule {
  constructor(
    @Inject(LOCAL_AUTH_MODULE_OPTIONS)
    private options: AuthModuleOptions<unknown, ExtraOptions>,
  ) {}

  static forRoot<T>(
    options: AuthModuleOptions<T, ExtraOptions>,
  ): DynamicModule {
    return {
      imports: [PassportModule.register({ session: true })],
      module: LocalAuthModule,
      providers: [
        {
          provide: LOCAL_AUTH_MODULE_OPTIONS,
          useValue: options,
        },
        ...this.createProviders(),
      ],
      exports: [LocalAuthService],
    };
  }

  static forRootAsync<T>(
    options: AsyncAuthModuleOptions<T, ExtraOptions>,
  ): DynamicModule {
    return {
      ...options,
      module: LocalAuthModule,
      imports: [PassportModule.register({ session: true })],
      providers: [
        {
          provide: LOCAL_AUTH_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        ...this.createProviders(),
      ],
      exports: [LocalAuthService],
    };
  }

  private static createProviders() {
    return [LocalAuthService, LocalStrategy, LocalSerializer];
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session(this.options.session),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
