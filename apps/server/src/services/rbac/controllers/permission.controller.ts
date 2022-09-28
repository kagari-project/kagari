import { CreateBaseControllerHelper } from '../create-base-controller.helper';
import { PermissionEntity } from '../../../entities/Permission.entity';

export class PermissionController extends CreateBaseControllerHelper<PermissionEntity>(
  PermissionEntity,
  { path: 'permissions' },
) {}
