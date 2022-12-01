import {
  Controller,
  Inject,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { randomBytes, createHash } from 'node:crypto';
import { fromBuffer } from 'file-type';
import { MEDIA_MODULE_OPTIONS } from './token';
import { MediaModuleOptions } from './types';

@Controller('upload')
export class UploadController {
  constructor(
    @Inject(MEDIA_MODULE_OPTIONS) private options: MediaModuleOptions,
  ) {}
  private randomName() {
    return createHash('sha1')
      .update(
        Buffer.concat([randomBytes(20), Buffer.from(Date.now().toString())]),
      )
      .digest('hex');
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const { mime, ext } = await fromBuffer(file.buffer);
    const randomName = `${this.randomName()}.${ext}`;
    const savePath = join(
      this.options.rootPath,
      this.options.tempDir,
      randomName,
    );
    const Key = join(this.options.tempDir, randomName);
    const url = join(this.options.serveRoot, Key);
    writeFileSync(savePath, file.buffer);
    return {
      url,
      Key,
      mime,
      ext,
    };
  }
}
