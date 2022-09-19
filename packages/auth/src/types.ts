import { Repository } from '@kagari/database';
import { ModuleMetadata, Type } from '@nestjs/common';

export type Credential = { [key: string]: string };

export type AuthModuleOptions<Entity = unknown, ExtraOptions = unknown> = {
  strategy: Type;
  entity: Type<Entity>;
  validate: (
    repo: Repository<Entity>,
    credential: Credential,
  ) => boolean | Promise<boolean>;
} & ExtraOptions;

export type AsyncAuthModuleOptions<
  Entity = unknown,
  ExtraOptions = unknown,
> = Pick<ModuleMetadata, 'imports'> & {
  useExisting?: Type;
  useClass?: Type;
  useFactory: (...args: any[]) => AuthModuleOptions<Entity, ExtraOptions>;
  inject?: Type[];
};
