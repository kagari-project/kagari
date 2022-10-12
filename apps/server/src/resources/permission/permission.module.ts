import { Module } from '@nestjs/common';
import { DatabaseModule } from '@kagari/database';
import { PermissionEntity } from '../../core/entities/Permission.entity';
import { PermissionController } from './permission.controller';

@Module({
  imports: [DatabaseModule.forFeature([PermissionEntity])],
  controllers: [PermissionController],
})
export class PermissionModule {}
