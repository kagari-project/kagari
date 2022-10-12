import { Module } from '@nestjs/common';
import { UserModule } from '../../resources/user/user.module';
import { DemoController } from './demo.controller';
import { RouterModule } from '@nestjs/core';
import { RoleModule } from '../../resources/role/role.module';

@Module({
  imports: [
    RouterModule.register([
      { path: 'api', module: UserModule },
      { path: 'api', module: RoleModule },
    ]),
    UserModule,
    RoleModule,
  ],
  controllers: [DemoController],
})
export class ApiModule {}
