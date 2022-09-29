import { CreateBaseControllerHelper } from '../../../core/helpers/create-base-controller.helper';
import { PermissionEntity } from '../../../core/entities/Permission.entity';

export class PermissionController extends CreateBaseControllerHelper<PermissionEntity>(
  PermissionEntity,
  { path: 'permissions' },
) {}
