import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@kagari/database';
import { UserEntity } from './entities/User.entity';
import { AuthModule, LocalStrategy } from '@kagari/auth';

@Module({
  imports: [
    DatabaseModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        entities: [UserEntity],
        migrations: [],
        url: 'postgres://root:root@localhost:5432/postgres',
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
