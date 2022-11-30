import { Controller, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { randomBytes, createHash } from 'node:crypto';
import { fromBuffer } from 'file-type';

@Controller('upload')
export class UploadController {
  private randomName() {
    return createHash('sha1')
      .update(
        Buffer.concat([randomBytes(20), Buffer.from(Date.now().toString())]),
      )
      .digest('hex');
  }

  public localTempRoot = join(__dirname, '../../../public/temp'); // todo read from module options
  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const { mime, ext } = await fromBuffer(file.buffer);
    const randomName = `${this.randomName()}.${ext}`;
    const savePath = join(this.localTempRoot, randomName);
    const Key = `temp/${randomName}`; // todo read from module options
    const url = `/media/${Key}`; // todo read from module options
    writeFileSync(savePath, file.buffer);
    return {
      url,
      Key,
      mime,
      ext,
    };
  }
}
