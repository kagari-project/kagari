import { Module } from '@nestjs/common';
import { UserModule } from '../../resources/user/user.module';
import { DemoController } from './demo.controller';
import { RouterModule } from '@nestjs/core';
import { RoleModule } from '../../resources/role/role.module';
import { PermissionModule } from '../../resources/permission/permission.module';

@Module({
  imports: [
    RouterModule.register([
      { path: 'api', module: UserModule },
      { path: 'api', module: RoleModule },
      { path: 'api', module: PermissionModule },
    ]),
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [DemoController],
})
export class ApiModule {}
