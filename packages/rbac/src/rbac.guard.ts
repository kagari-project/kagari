import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RoleBasedAccessControlModuleOptions as ModuleOptions } from './types';
import { RBAC_OPTIONS } from './token';

@Injectable()
export class RoleBasedAccessControlGuard implements CanActivate {
  constructor(
    public reflector: Reflector,
    @Inject(RBAC_OPTIONS) public options: ModuleOptions,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.options.canActivate.call(this, context);
  }
}
