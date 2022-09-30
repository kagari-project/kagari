import { DynamicModule, Module } from '@nestjs/common';
import {
  RoleBasedAccessControlModuleOptions as ModuleOptions,
  AsyncRoleBasedAccessControlModuleOptions as AsyncModuleOptions,
} from './types';
import { RBAC_OPTIONS } from './token';

@Module({})
export class RoleBasedAccessControlModule {
  static forRoot(options: ModuleOptions): DynamicModule {
    return {
      module: RoleBasedAccessControlModule,
      providers: [
        {
          provide: RBAC_OPTIONS,
          useValue: options,
        },
        ...this.createProviders(),
      ],
    };
  }

  static forRootAsync(options: AsyncModuleOptions): DynamicModule {
    return {
      module: RoleBasedAccessControlModule,
      providers: [
        {
          inject: options.inject,
          provide: RBAC_OPTIONS,
          useFactory: options.useFactory,
        },
        ...this.createProviders(),
      ],
    };
  }

  private static createProviders() {
    return [];
  }
}
