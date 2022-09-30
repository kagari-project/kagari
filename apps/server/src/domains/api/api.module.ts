import { Module } from '@nestjs/common';
import { RbacModule } from '../../services/rbac/rbac.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from '../../resources/user/user.module';
import { DemoController } from './demo.controller';

@Module({
  imports: [
    RouterModule.register([{ path: 'api', module: RbacModule }]),
    UserModule,
  ],
  controllers: [DemoController],
})
export class ApiModule {}
