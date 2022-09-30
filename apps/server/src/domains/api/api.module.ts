import { Module } from '@nestjs/common';
import { UserModule } from '../../resources/user/user.module';
import { DemoController } from './demo.controller';

@Module({
  imports: [UserModule],
  controllers: [DemoController],
})
export class ApiModule {}
