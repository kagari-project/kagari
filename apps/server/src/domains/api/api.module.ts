import { Module } from '@nestjs/common';
import { RbacModule } from '../../services/rbac/rbac.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([{ path: 'api', module: RbacModule }]),
    RbacModule,
  ],
})
export class ApiModule {}
