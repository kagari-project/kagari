import { Controller, Get, UseGuards } from '@nestjs/common';
import { getAuthenticatedGuard } from '../../core/guards/authenticated.guard';
import { IsPublic } from '../../core/decorators/public.decorator';
import { RoleBasedAccessControlGuard } from '@kagari/rbac';
// import { ApiExcludeController } from '@nestjs/swagger';

// @ApiExcludeController()
@UseGuards(getAuthenticatedGuard('jwt'))
@Controller('demo')
export class DemoController {
  @IsPublic()
  @Get('public')
  publicMethod() {
    return {
      message: 'i am public readable',
    };
  }

  @Get('private')
  privateMethod() {
    return {
      message: 'i am private readable',
    };
  }

  @UseGuards(RoleBasedAccessControlGuard)
  @Get('rbac')
  protectedByRbac() {
    return {
      message: 'i am protected by rbac rules',
    };
  }
}
