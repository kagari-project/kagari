import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadController } from './Upload.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../public'),
      serveRoot: '/media/',
    }),
  ],
  controllers: [UploadController],
})
export class MediaModule {}
