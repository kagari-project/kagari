import { Module } from '@nestjs/common';
import { DatabaseModule } from '@kagari/database';
import { UserEntity } from '../../entities/User.entity';
import { RoleEntity } from '../../entities/Role.entity';
import { PermissionEntity } from '../../entities/Permission.entity';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';

@Module({
  imports: [
    DatabaseModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
  ],
  controllers: [UserController, RoleController, PermissionController],
})
export class RbacModule {}
