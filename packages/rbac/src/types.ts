import { ModuleMetadata, Type } from '@nestjs/common';

export type RoleBasedAccessControlModuleOptions = {
  foobar: string;
};

export type AsyncRoleBasedAccessControlModuleOptions = Pick<
  ModuleMetadata,
  'imports'
> & {
  inject?: Type[];
  useFactory: (
    ...args: any[]
  ) =>
    | Promise<RoleBasedAccessControlModuleOptions>
    | RoleBasedAccessControlModuleOptions;
};
