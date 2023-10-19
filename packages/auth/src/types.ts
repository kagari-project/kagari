import { Repository, ObjectLiteral } from '@kagari/database';
import { ModuleMetadata, Type } from '@nestjs/common';

export type Credential = { [key: string]: string };

export type VerifyFunction<Entity extends ObjectLiteral> = (
  repo: Repository<Entity>,
  credential: Credential,
) => Promise<Entity>;

export type ValidateFunction = (credential: Credential) => void;

export type ComposeAccessTokenPayload<Entity> = (
  userInfo: Entity,
) => Record<string, unknown>;

export type ComposeRefreshTokenPayload<Entity> = (
  userInfo: Entity,
) => Record<string, unknown>;

export type AuthModuleOptions<
  Entity extends ObjectLiteral = ObjectLiteral,
  ExtraOptions = unknown,
> = {
  entity: Type<Entity>;
  validate?: ValidateFunction;
  verify: VerifyFunction<Entity>;
} & ExtraOptions;

export type AsyncAuthModuleOptions<
  Entity extends ObjectLiteral = ObjectLiteral,
  ExtraOptions = unknown,
> = Pick<ModuleMetadata, 'imports'> & {
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) =>
    | Promise<AuthModuleOptions<Entity, ExtraOptions>>
    | AuthModuleOptions<Entity, ExtraOptions>;
  inject?: Type[];
};
