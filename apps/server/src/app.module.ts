import { BadRequestException, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule, TypeOrmModuleOptions } from '@kagari/database';
import { UserEntity } from './entities/User.entity';
import { AuthModule, LocalStrategy } from '@kagari/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ConfigValidationSchema from './core/config.schema';

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
        entities: [UserEntity],
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
    AuthModule.register<UserEntity>({
      strategy: LocalStrategy,
      entity: UserEntity,
      validate: async (repo, credential) => {
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
      },
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
