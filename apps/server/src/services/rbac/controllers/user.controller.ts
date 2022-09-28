import { UserEntity } from '../../../entities/User.entity';
import { CreateBaseControllerHelper } from '../../../core/create-base-controller.helper';

export class UserController extends CreateBaseControllerHelper<UserEntity>(
  UserEntity,
  { path: 'users' },
) {}
