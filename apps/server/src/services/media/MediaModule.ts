import { DynamicModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadController } from './Upload.controller';
import { MediaModuleOptions } from './types';
import { MEDIA_MODULE_OPTIONS } from './token';

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
      ],
      providers: [
        {
          provide: MEDIA_MODULE_OPTIONS,
          useValue: options,
        },
        ...this.createProviders(),
      ],
      controllers: [UploadController],
    };
  }

  private static createProviders() {
    return [];
  }
}
