import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '@kagari/database';
import { UserEntity } from '../../core/entities/User.entity';

@Module({
  imports: [DatabaseModule.forFeature([UserEntity])],
  controllers: [UserController],
})
export class UserModule {}
