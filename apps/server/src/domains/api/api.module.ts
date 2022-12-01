import { Module } from '@nestjs/common';
import { UserModule } from '../../resources/user/user.module';
import { DemoController } from './demo.controller';
import { RouterModule } from '@nestjs/core';
import { RoleModule } from '../../resources/role/role.module';
import { PermissionModule } from '../../resources/permission/permission.module';
import { MediaModule } from '../../services/media/media.module';
import { join } from 'node:path';

@Module({
  imports: [
    RouterModule.register([
      { path: 'api', module: UserModule },
      { path: 'api', module: RoleModule },
      { path: 'api', module: PermissionModule },
      { path: 'api', module: MediaModule },
    ]),
    UserModule,
    RoleModule,
    PermissionModule,
    MediaModule.forRoot({
      rootPath: join(__dirname, '../../../public'),
      serveRoot: '/media/',
      tempDir: 'temp',
    }),
  ],
  controllers: [DemoController],
})
export class ApiModule {}
