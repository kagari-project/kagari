import { Module, RequestMethod } from '@nestjs/common';
import { RenderErrorFilter, ThemeEngineModule } from '@kagari/multi-themes';
import { MvcController } from './mvc.controller';
import { APP_FILTER } from '@nestjs/core';
import * as helpers from './helpers';
import * as path from 'path';

@Module({
  imports: [
    ThemeEngineModule.forRoot({
      theme: 'default',
      helpers,
      baseDir: path.resolve(__dirname, '../../views'),
    }),
  ],
  controllers: [MvcController],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: () => {
        return new RenderErrorFilter().exclude([
          { path: /^\/api/, method: RequestMethod.ALL },
        ]);
      },
    },
  ],
})
export class MvcModule {}
