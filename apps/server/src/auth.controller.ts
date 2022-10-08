import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import {
  AuthenticatedGuard,
  JwtAuthService,
  LocalAuthGuard,
} from '@kagari/auth';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private jwtSigner: JwtAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: {
                type: 'string',
                example: 'root',
              },
              password: {
                type: 'string',
                example: 'root',
              },
            },
          },
        },
      },
    },
  })
  async login(@Request() req) {
    const tokens = await this.jwtSigner.signature(req.user);
    return {
      data: req.user,
      ...tokens,
    };
  }

  @Post('logout')
  logout(@Request() request) {
    return new Promise((resolve) => request.logOut(resolve));
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  profile(@Request() request) {
    return request.user;
  }
}
