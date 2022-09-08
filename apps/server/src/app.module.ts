import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@kagari/database';
import { UserEntity } from './entities/User.entity';

@Module({
  imports: [
    DatabaseModule.forRoot({
      type: 'postgres',
      entities: [UserEntity],
      migrations: [],
      url: 'postgres://root:root@localhost:5432/postgres',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
