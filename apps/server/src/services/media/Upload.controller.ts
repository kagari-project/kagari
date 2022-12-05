import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'node:path';
import { writeFile, copyFile, ensureDir } from 'fs-extra';
import { randomBytes, createHash } from 'node:crypto';
import { fromBuffer } from 'file-type';
import { MEDIA_MODULE_OPTIONS } from './token';
import { MediaModuleOptions } from './types';
import { InjectRepository, Repository } from '@kagari/database';
import { MediaEntity } from './Media.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(
    @Inject(MEDIA_MODULE_OPTIONS) private options: MediaModuleOptions,
    @InjectRepository(MediaEntity) private repo: Repository<MediaEntity>,
  ) {}
  private randomName() {
    return createHash('sha1')
      .update(
        Buffer.concat([randomBytes(20), Buffer.from(Date.now().toString())]),
      )
      .digest('hex');
  }

  private hashDirs(hash: string, depth = 3) {
    const prefixStr = hash.slice(0, depth * 2);
    const dirs = [];
    for (let i = 0; i < depth; i++) {
      dirs.push(prefixStr.slice(i * 2, i * 2 + 2));
    }
    return join(...dirs);
  }

  @ApiOperation({
    tags: ['upload'],
  })
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
    const key = join(this.options.tempDir, randomName);
    const url = join(this.options.serveRoot, key);
    await writeFile(savePath, file.buffer);
    return {
      url,
      key,
      mime,
      ext,
      storage: 'local',
    };
  }

  @ApiOperation({
    tags: ['upload'],
  })
  @Post('complete')
  async complete(
    @Body() data: { key: string; mime: string; ext: string; storage: string },
  ) {
    const hash = this.randomName();
    const dir = this.hashDirs(hash);
    const destFileName = `${hash}.${data.ext}`;
    const destKey = join(dir, destFileName);
    const destDir = join(this.options.rootPath, dir);

    const srcFile = join(this.options.rootPath, data.key);
    const destFile = join(this.options.rootPath, destKey);

    await ensureDir(destDir);
    await copyFile(srcFile, destFile);
    return await this.repo.save(
      this.repo.create({
        key: destKey,
        storage: data.storage,
        mime: data.mime,
      }),
    );
  }
}
