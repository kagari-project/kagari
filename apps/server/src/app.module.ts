import { Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {
  DatabaseModule,
  DataSource,
  NestLogger,
  TypeOrmModuleOptions,
} from '@kagari/database';
import { UserEntity } from './core/entities/User.entity';
import { JwtAuthModule, LocalAuthModule } from '@kagari/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './domains/api/api.module';

import { TypeormStore } from 'typeorm-store';
import ConfigValidationSchema from './core/config.schema';
import { RoleEntity } from './core/entities/Role.entity';
import { PermissionEntity } from './core/entities/Permission.entity';
import {
  canActivate,
  composeAccessTokenPayload,
  composeRefreshTokenPayload,
  verify,
  validate,
} from './helpers';
import { CoreModule } from './core/core.module';
import { RoleBasedAccessControlModule } from '@kagari/rbac';
import { SessionEntity } from './core/entities/Session.entity';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
      validationSchema: ConfigValidationSchema,
    }),
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: cs.get('DATABASE.TYPE'),
        entities: [UserEntity, RoleEntity, PermissionEntity, SessionEntity],
        migrations: [],
        logging: cs.get<string | boolean>('DATABASE.LOGGING'),
        logger: new NestLogger({ context: 'database' }),
        url: cs.get('DATABASE.URL'),
        database: cs.get('DATABASE.DATABASE'),
        synchronize:
          cs.get('NODE_ENV') === 'production'
            ? false
            : cs.get<boolean>('DATABASE.SYNCHRONIZE', false),
      }),
    } as TypeOrmModuleOptions),
    LocalAuthModule.forRootAsync<UserEntity>({
      inject: [ConfigService, DataSource],
      useFactory: (cs: ConfigService, dataSource: DataSource) => ({
        entity: UserEntity,
        verify,
        validate,
        session: {
          secret: cs.get<string>('HTTP.SESSION.SECRET', 'secret'),
          saveUninitialized: false,
          resave: false,
          store: new TypeormStore({
            repository: dataSource.getRepository(SessionEntity),
          }),
        },
        exclude: [{ path: '/api/(.*)', method: RequestMethod.ALL }],
      }),
    }),
    JwtAuthModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        entity: UserEntity,
        verify,
        validate,
        jwt: {
          secret: cs.get<string>('HTTP.JWT.SECRET', 'secret'),
        },
        payload: {
          access: composeAccessTokenPayload,
          refresh: composeRefreshTokenPayload,
        },
      }),
    }),
    RoleBasedAccessControlModule.forRootAsync({
      global: true,
      useFactory: () => ({
        entities: {
          user: UserEntity,
          role: RoleEntity,
          permission: PermissionEntity,
        },
        canActivate,
      }),
    }),
    ApiModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
