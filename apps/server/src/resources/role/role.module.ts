import { Module } from '@nestjs/common';
import { DatabaseModule } from '@kagari/database';
import { RoleEntity } from '../../core/entities/Role.entity';
import { RoleController } from './role.controller';
import { PermissionEntity } from '../../core/entities/Permission.entity';

@Module({
  imports: [DatabaseModule.forFeature([RoleEntity, PermissionEntity])],
  controllers: [RoleController],
})
export class RoleModule {}
