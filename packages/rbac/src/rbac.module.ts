import { DynamicModule, Module } from '@nestjs/common';
import {
  RoleBasedAccessControlModuleOptions as ModuleOptions,
  AsyncRoleBasedAccessControlModuleOptions as AsyncModuleOptions,
} from './types';
import { RBAC_OPTIONS } from './token';
import { RoleBasedAccessControlGuard } from './rbac.guard';

@Module({})
export class RoleBasedAccessControlModule {
  static forRoot(options: ModuleOptions): DynamicModule {
    return {
      global: options.global,
      module: RoleBasedAccessControlModule,
      providers: [
        {
          provide: RBAC_OPTIONS,
          useValue: options,
        },
        ...this.createProviders(),
      ],
      exports: [...this.createExports()],
    };
  }

  static forRootAsync(options: AsyncModuleOptions): DynamicModule {
    return {
      global: options.global,
      module: RoleBasedAccessControlModule,
      providers: [
        {
          inject: options.inject,
          provide: RBAC_OPTIONS,
          useFactory: options.useFactory,
        },
        ...this.createProviders(),
      ],
      exports: [...this.createExports()],
    };
  }

  private static createProviders() {
    return [RoleBasedAccessControlGuard];
  }

  private static createExports() {
    return [RBAC_OPTIONS, RoleBasedAccessControlGuard];
  }
}
