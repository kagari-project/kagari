import { UserEntity } from '../../core/entities/User.entity';
import { CreateBaseControllerHelper } from '../../core/helpers/create-base-controller.helper';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { In, InjectRepository, Repository } from '@kagari/database';
import { JoiValidationPipe } from '../../core/pipes/joi-validation.pipe';
import { UuidSchema } from '../../core/schemas/uuid.schema';
import { RoleEntity } from '../../core/entities/Role.entity';
import { PermissionEntity } from '../../core/entities/Permission.entity';
import { RoleBasedAccessControlGuard } from '@kagari/rbac';
import { getAuthenticatedGuard } from '../../core/guards/authenticated.guard';

@UseGuards(getAuthenticatedGuard('jwt'), RoleBasedAccessControlGuard)
export class UserController extends CreateBaseControllerHelper<UserEntity>(
  UserEntity,
  {
    controllerOptions: { path: 'users' },
  },
) {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private permissionRepo: Repository<PermissionEntity>,
  ) {
    super(userRepo);
  }

  @Get(':id/roles')
  async findAllRoles(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
  ) {
    const user = await this.userRepo.findOneOrFail({
      where: { id },
      relations: ['roles'],
    });
    return { list: user.roles, total: user.roles.length };
  }

  @Put(':id/roles')
  async addRoles(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('roles') roles: Array<RoleEntity>,
  ) {
    await this.userRepo
      .createQueryBuilder()
      .relation(UserEntity, 'roles')
      .of(id)
      .add(roles);
  }

  @Delete(':id/roles')
  async deleteRoles(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('roles') roles: Array<RoleEntity>,
  ) {
    await this.userRepo
      .createQueryBuilder()
      .relation(UserEntity, 'roles')
      .of(id)
      .remove(roles);
  }

  @Get(':id/permissions')
  async findAllPermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
  ) {
    const user = await this.userRepo.findOneOrFail({
      where: { id },
      relations: ['permissions'],
    });
    return {
      list: user.permissions,
      total: user.permissions.length,
    };
  }

  @Put(':id/permissions')
  async addPermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    const user = await this.userRepo.findOneOrFail({
      where: { id },
    });

    user.permissions = permissions;
    await this.userRepo.manager.save(user);
  }

  @Delete(':id/permissions')
  async deletePermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    const user = await this.userRepo.findOneOrFail({
      where: { id },
    });

    user.permissions = permissions;
    await this.userRepo.manager.save(user);
  }
}
