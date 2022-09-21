import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, LocalAuthGuard } from '@kagari/auth';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthService } from '@kagari/auth';

@Controller('jwt-auth')
export class JwtAuthController {
  constructor(private authService: JwtAuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    tags: ['auth', 'jwt'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  })
  login(@Request() req) {
    return this.authService.signature(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return { msg: 'this is protected' };
  }
}
