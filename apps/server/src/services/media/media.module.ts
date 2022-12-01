import { DynamicModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadController } from './Upload.controller';
import { MediaModuleOptions } from './types';
import { MEDIA_MODULE_OPTIONS } from './token';
import { DatabaseModule } from '@kagari/database';
import { MediaEntity } from './Media.entity';
import { MediaController } from './media.controller';

@Module({})
export class MediaModule {
  static forRoot(options: MediaModuleOptions): DynamicModule {
    return {
      module: MediaModule,
      imports: [
        ServeStaticModule.forRoot({
          rootPath: options.rootPath,
          serveRoot: options.serveRoot,
        }),
        DatabaseModule.forFeature([MediaEntity]),
      ],
      providers: [
        {
          provide: MEDIA_MODULE_OPTIONS,
          useValue: options,
        },
        ...this.createProviders(),
      ],
      controllers: [UploadController, MediaController],
    };
  }

  private static createProviders() {
    return [];
  }
}
