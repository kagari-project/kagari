import { BadRequestException, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule, TypeOrmModuleOptions } from '@kagari/database';
import { UserEntity } from './entities/User.entity';
import { JwtAuthModule, LocalAuthModule } from '@kagari/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';

import ConfigValidationSchema from './core/config.schema';
import { RoleEntity } from './entities/Role.entity';
import { PermissionEntity } from './entities/Permission.entity';

const validateUser = async (repo, credential) => {
  const user = await repo.findOne({
    where: { username: credential.username },
  });

  if (!user) {
    throw new BadRequestException({ error: 'user not found' });
  }

  if (user.password !== credential.password) {
    throw new BadRequestException({ error: 'incorrect password' });
  }

  return user;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
      validationSchema: ConfigValidationSchema,
    }),
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: cs.get('DATABASE.TYPE'),
        entities: [UserEntity, RoleEntity, PermissionEntity],
        migrations: [],
        logging: cs.get<string | boolean>('DATABASE.LOGGING'),
        url: cs.get('DATABASE.URL'),
        database: cs.get('DATABASE.DATABASE'),
        synchronize:
          cs.get('NODE_ENV') === 'production'
            ? false
            : cs.get<boolean>('DATABASE.SYNCHRONIZE', false),
      }),
    } as TypeOrmModuleOptions),
    JwtAuthModule.forRootAsync<UserEntity>({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        entity: UserEntity,
        validate: validateUser,
        jwt: {
          secret: cs.get<string>('HTTP.JWT.SECRET', 'secret'),
        },
      }),
    }),
    LocalAuthModule.forRootAsync<UserEntity>({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        entity: UserEntity,
        validate: validateUser,
        session: {
          secret: cs.get<string>('HTTP.SESSION.SECRET', 'secret'),
          saveUninitialized: false,
          resave: false,
        },
      }),
    }),
  ],
  controllers: [AuthController],
})
export class AppModule {}
