/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleMetadata, Type } from '@nestjs/common';

type RequiredEntities<U, R, P> = {
  user: Type<U>;
  role: Type<R>;
  permission: Type<P>;
};

export type RoleBasedAccessControlModuleOptions<
  UserEntity = any,
  RoleEntity = any,
  PermissionEntity = any,
> = {
  entities: RequiredEntities<UserEntity, RoleEntity, PermissionEntity>;
};

export type AsyncRoleBasedAccessControlModuleOptions<
  UserEntity = any,
  RoleEntity = any,
  PermissionEntity = any,
> = Pick<ModuleMetadata, 'imports'> & {
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
