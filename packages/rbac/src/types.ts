/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext, ModuleMetadata, Type } from '@nestjs/common';

export type RequiredEntities<U, R, P> = {
  user: Type<U>;
  role: Type<R>;
  permission: Type<P>;
};

export type CanActivateFunction = (
  context: ExecutionContext,
) => Promise<boolean> | boolean;

export type RoleBasedAccessControlModuleOptions<
  UserEntity = any,
  RoleEntity = any,
  PermissionEntity = any,
> = {
  global?: boolean;
  entities: RequiredEntities<UserEntity, RoleEntity, PermissionEntity>;
  canActivate: CanActivateFunction;
};

export type AsyncRoleBasedAccessControlModuleOptions<
  UserEntity = any,
  RoleEntity = any,
  PermissionEntity = any,
> = Pick<ModuleMetadata, 'imports'> & {
  global?: boolean;
  inject?: Type[];
  useFactory: (
    ...args: unknown[]
  ) =>
    | Promise<
        RoleBasedAccessControlModuleOptions<
          UserEntity,
          RoleEntity,
          PermissionEntity
        >
      >
    | RoleBasedAccessControlModuleOptions<
        UserEntity,
        RoleEntity,
        PermissionEntity
      >;
};
