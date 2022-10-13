import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '@kagari/database';
import { UserEntity } from '../../core/entities/User.entity';
import { RoleEntity } from '../../core/entities/Role.entity';
import { PermissionEntity } from '../../core/entities/Permission.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
  ],
  controllers: [UserController],
})
export class UserModule {}
