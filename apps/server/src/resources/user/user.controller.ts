import { UserEntity } from '../../core/entities/User.entity';
import { CreateBaseControllerHelper } from '../../core/helpers/create-base-controller.helper';
import { Body, Get, Param, Patch } from '@nestjs/common';
import { InjectRepository, Repository } from '@kagari/database';
import { JoiValidationPipe } from '../../core/pipes/joi-validation.pipe';
import { UuidSchema } from '../../core/schemas/uuid.schema';
import { RoleEntity } from '../../core/entities/Role.entity';
import { PermissionEntity } from '../../core/entities/Permission.entity';

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
    return user.roles;
  }

  @Patch(':id/roles')
  async updateRoles(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('roles') roles: Array<RoleEntity>,
  ) {
    const user = await this.userRepo.findOneOrFail({
      where: { id },
    });

    user.roles = roles;
    await this.userRepo.manager.save(user);
  }

  @Get(':id/permissions')
  async findAllPermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
  ) {
    const user = await this.userRepo.findOneOrFail({
      where: { id },
      relations: ['permissions'],
    });
    return user.permissions;
  }

  @Patch(':id/permissions')
  async updatePermissions(
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
