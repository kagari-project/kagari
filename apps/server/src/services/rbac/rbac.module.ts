import { Module } from '@nestjs/common';
import { DatabaseModule } from '@kagari/database';
import { UserEntity } from '../../core/entities/User.entity';
import { RoleEntity } from '../../core/entities/Role.entity';
import { PermissionEntity } from '../../core/entities/Permission.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
  ],
})
export class RbacModule {}
