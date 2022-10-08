import { Module } from '@nestjs/common';
import { UserModule } from '../../resources/user/user.module';
import { DemoController } from './demo.controller';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([{ path: 'api', module: UserModule }]),
    UserModule,
  ],
  controllers: [DemoController],
})
export class ApiModule {}
