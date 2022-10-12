import { CreateBaseControllerHelper } from '../../core/helpers/create-base-controller.helper';
import { RoleEntity } from '../../core/entities/Role.entity';

export class RoleController extends CreateBaseControllerHelper<RoleEntity>(
  RoleEntity,
  {
    controllerOptions: {
      path: 'roles',
    },
  },
) {}
