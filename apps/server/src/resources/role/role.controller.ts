import { CreateBaseControllerHelper } from '../../core/helpers/create-base-controller.helper';
import { RoleEntity } from '../../core/entities/Role.entity';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository, Repository } from '@kagari/database';
import { PermissionEntity } from '../../core/entities/Permission.entity';
import { JoiValidationPipe } from '../../core/pipes/joi-validation.pipe';
import { UuidSchema } from '../../core/schemas/uuid.schema';
import { getAuthenticatedGuard } from '../../core/guards/authenticated.guard';
import { RoleBasedAccessControlGuard } from '@kagari/rbac';
import { UserEntity } from '../../core/entities/User.entity';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(getAuthenticatedGuard('jwt'), RoleBasedAccessControlGuard)
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

  @ApiOperation({
    tags: [`${RoleEntity.name}.${PermissionEntity.name}`],
  })
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

  @ApiOperation({
    tags: [`${RoleEntity.name}.${PermissionEntity.name}`],
  })
  @Put(':id/permissions')
  async addPermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    await this.roleRepo
      .createQueryBuilder()
      .relation(RoleEntity, 'permissions')
      .of(id)
      .add(permissions);
  }

  @ApiOperation({
    tags: [`${RoleEntity.name}.${PermissionEntity.name}`],
  })
  @Patch(':id/permissions')
  async setPermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    await this.roleRepo
      .createQueryBuilder()
      .relation(RoleEntity, 'permissions')
      .of(id)
      .set(permissions);
  }

  @ApiOperation({
    tags: [`${RoleEntity.name}.${PermissionEntity.name}`],
  })
  @Delete(':id/permissions')
  async removePermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    await this.roleRepo
      .createQueryBuilder()
      .relation(RoleEntity, 'permissions')
      .of(id)
      .remove(permissions);
  }
}
