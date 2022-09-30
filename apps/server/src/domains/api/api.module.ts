import { Module } from '@nestjs/common';
import { RbacModule } from '../../services/rbac/rbac.module';
import { RouterModule } from '@nestjs/core';
import { UserModule } from '../../resources/user/user.module';

@Module({
  imports: [
    RouterModule.register([{ path: 'api', module: RbacModule }]),
    UserModule,
  ],
})
export class ApiModule {}
