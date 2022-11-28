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
import { InjectRepository, Repository } from '@kagari/database';
import { JoiValidationPipe } from '../../core/pipes/joi-validation.pipe';
import { UuidSchema } from '../../core/schemas/uuid.schema';
import { RoleEntity } from '../../core/entities/Role.entity';
import { PermissionEntity } from '../../core/entities/Permission.entity';
import { RoleBasedAccessControlGuard } from '@kagari/rbac';
import { getAuthenticatedGuard } from '../../core/guards/authenticated.guard';
import { ParsedQueryString, QueryProtocol } from '@kagari/restful';
import { ApiOperation } from '@nestjs/swagger';

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

  @ApiOperation({
    tags: [`${UserEntity.name}.${RoleEntity.name}`],
  })
  @Get(':id/roles')
  async findAllRoles(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @QueryProtocol()
    query: ParsedQueryString,
  ) {
    const user = await this.userRepo.findOneOrFail({
      where: { id },
      relations: ['roles'],
    });
    return { list: user.roles, total: user.roles.length };
  }

  @ApiOperation({
    tags: [`${UserEntity.name}.${RoleEntity.name}`],
  })
  @Patch(':id/roles')
  async setRoles(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('roles') roles: Array<RoleEntity>,
  ) {
    await this.userRepo
      .createQueryBuilder()
      .relation(UserEntity, 'roles')
      .of(id)
      .set(roles);
  }

  @ApiOperation({
    tags: [`${UserEntity.name}.${RoleEntity.name}`],
  })
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

  @ApiOperation({
    tags: [`${UserEntity.name}.${RoleEntity.name}`],
  })
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

  @ApiOperation({
    tags: [`${UserEntity.name}.${PermissionEntity.name}`],
  })
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

  @ApiOperation({
    tags: [`${UserEntity.name}.${PermissionEntity.name}`],
  })
  @Patch(':id/permissions')
  async setPermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    await this.userRepo
      .createQueryBuilder()
      .relation(UserEntity, 'permissions')
      .of(id)
      .set(permissions);
  }

  @ApiOperation({
    tags: [`${UserEntity.name}.${PermissionEntity.name}`],
  })
  @Put(':id/permissions')
  async addPermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    await this.userRepo
      .createQueryBuilder()
      .relation(UserEntity, 'permissions')
      .of(id)
      .add(permissions);
  }

  @ApiOperation({
    tags: [`${UserEntity.name}.${PermissionEntity.name}`],
  })
  @Delete(':id/permissions')
  async deletePermissions(
    @Param('id', new JoiValidationPipe(UuidSchema)) id: string,
    @Body('permissions') permissions: Array<PermissionEntity>,
  ) {
    await this.userRepo
      .createQueryBuilder()
      .relation(UserEntity, 'permissions')
      .of(id)
      .remove(permissions);
  }
}
