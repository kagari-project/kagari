import { CreateBaseControllerHelper } from '../create-base-controller.helper';
import { RoleEntity } from '../../../entities/Role.entity';

export class RoleController extends CreateBaseControllerHelper<RoleEntity>(
  RoleEntity,
  { path: 'roles' },
) {}
