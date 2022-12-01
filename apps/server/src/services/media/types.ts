import { ModuleMetadata, Type } from '@nestjs/common';

export type MediaModuleOptions = {
  tempDir: string;
  rootPath: string;
  serveRoot: string;
};

export type MediaModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & {
  inject?: Type[];
  useFactory: (
    ...args: unknown[]
  ) => MediaModuleOptions | Promise<MediaModuleOptions>;
};
