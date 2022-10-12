import { Module } from '@nestjs/common';
import { DatabaseModule } from '@kagari/database';
import { RoleEntity } from '../../core/entities/Role.entity';
import { RoleController } from './role.controller';

@Module({
  imports: [DatabaseModule.forFeature([RoleEntity])],
  controllers: [RoleController],
})
export class RoleModule {}
