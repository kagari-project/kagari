import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@kagari/database';
import { UserEntity } from './entities/User.entity';
import { AuthModule, LocalStrategy } from '@kagari/auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ConfigValidationSchema from './core/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      validationSchema: ConfigValidationSchema,
    }),
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: cs.get('DATABASE.TYPE'),
        entities: [UserEntity],
        migrations: [],
        // i.g 'postgres://root:root@localhost:5432/postgres'
        url: cs.get('DATABASE.URL'),
      }),
    }),
    AuthModule.register<UserEntity>({
      strategy: LocalStrategy,
      entity: UserEntity,
      validate: async (repo, credential) => {
        const user = await repo.findOne({
          where: { username: credential.username },
        });
        return user.password === credential.password;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
