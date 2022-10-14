import { CreateBaseControllerHelper } from '../../core/helpers/create-base-controller.helper';
import { PermissionEntity } from '../../core/entities/Permission.entity';
import { UseGuards } from '@nestjs/common';
import { getAuthenticatedGuard } from '../../core/guards/authenticated.guard';
import { RoleBasedAccessControlGuard } from '@kagari/rbac';

@UseGuards(getAuthenticatedGuard('jwt'), RoleBasedAccessControlGuard)
export class PermissionController extends CreateBaseControllerHelper<PermissionEntity>(
  PermissionEntity,
  {
    controllerOptions: {
      path: 'permissions',
    },
  },
) {}
