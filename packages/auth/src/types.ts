import { Repository } from '@kagari/database';
import { ModuleMetadata, Type } from '@nestjs/common';

export type Credential = { [key: string]: string };

export type ValidateFunction<Entity> = (
  repo: Repository<Entity>,
  credential: Credential,
) => Promise<Entity>;

export type AuthModuleOptions<Entity = unknown, ExtraOptions = unknown> = {
  entity: Type<Entity>;
  validate: ValidateFunction<Entity>;
} & ExtraOptions;

export type AsyncAuthModuleOptions<
  Entity = unknown,
  ExtraOptions = unknown,
> = Pick<ModuleMetadata, 'imports'> & {
  useExisting?: Type;
  useClass?: Type;
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) =>
    | Promise<AuthModuleOptions<Entity, ExtraOptions>>
    | AuthModuleOptions<Entity, ExtraOptions>;
  inject?: Type[];
};
