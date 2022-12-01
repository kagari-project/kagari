import { Controller, Get, UseGuards } from '@nestjs/common';
import { getAuthenticatedGuard } from '../../core/guards/authenticated.guard';
import { IsPublic } from '../../core/decorators/public.decorator';
import { RoleBasedAccessControlGuard } from '@kagari/rbac';
import { ApiOperation } from '@nestjs/swagger';
// import { ApiExcludeController } from '@nestjs/swagger';

// @ApiExcludeController()
@UseGuards(getAuthenticatedGuard('jwt'))
@Controller('demo')
export class DemoController {
  @IsPublic()
  @Get('public')
  @ApiOperation({
    tags: ['demo'],
  })
  publicMethod() {
    return {
      message: 'i am public readable',
    };
  }

  @ApiOperation({
    tags: ['demo'],
  })
  @Get('private')
  privateMethod() {
    return {
      message: 'i am private readable',
    };
  }

  @ApiOperation({
    tags: ['demo'],
  })
  @UseGuards(RoleBasedAccessControlGuard)
  @Get('rbac')
  protectedByRbac() {
    return {
      message: 'i am protected by rbac rules',
    };
  }
}
