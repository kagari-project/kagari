import { UserEntity } from '../../core/entities/User.entity';
import { CreateBaseControllerHelper } from '../../core/helpers/create-base-controller.helper';
import { Get } from '@nestjs/common';
import { QueryProtocol } from '@kagari/restful';
import { transformProtocol } from '../../core/helpers/transform-protocol';

export class UserController extends CreateBaseControllerHelper<UserEntity>(
  UserEntity,
  { path: 'users' },
) {
  @Get()
  findAll(@QueryProtocol() query) {
    const findOptions = transformProtocol(query);
    console.log(findOptions);
    return super.findAll(findOptions);
  }
}
