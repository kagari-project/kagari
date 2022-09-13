import { Repository } from '@kagari/database';
import { Type } from '@nestjs/common';

export type Credential = { [key: string]: string };

export type AuthModuleOptions<Entity = unknown, ExtraOptions = unknown> = {
  strategy: Type;
  entity: Type<Entity>;
  validate: (
    repo: Repository<Entity>,
    credential: Credential,
  ) => boolean | Promise<boolean>;
} & ExtraOptions;
