import { CreateBaseControllerHelper } from '../../core/helpers/create-base-controller.helper';
import { RoleEntity } from '../../core/entities/Role.entity';
import { Body, Get, Param, Patch } from '@nestjs/common';
import { InjectRepository, Repository } from '@kagari/database';
import { UserEntity } from '../../core/entities/User.entity';
import { PermissionEntity } from '../../core/entities/Permission.entity';
import { JoiValidationPipe } from '../../core/pipes/joi-validation.pipe';
import { UuidSchema } from '../../core/schemas/uuid.schema';

export class RoleController extends CreateBaseControllerHelper<RoleEntity>(
  RoleEntity,
  {
    controllerOptions: {
      path: 'roles',
    },
  },
) {
  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private permissionRepo: Repository<PermissionEntity>,
  ) {
    super(roleRepo);
  }

  @Get(':id/permissions')
  async findAllPermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
  ) {
    const role = await this.roleRepo.findOneOrFail({
      where: { id },
      relations: ['permissions'],
    });
    return {
      list: role.permissions,
      total: role.permissions.length,
    };
  }

  @Patch(':id/permissions')
  async updatePermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    const role = await this.roleRepo.findOneOrFail({
      where: { id },
    });
    role.permissions = permissions;
    await this.roleRepo.manager.save(role);
  }
}
