import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Session,
} from '@nestjs/common';
import { LocalAuthGuard } from '@kagari/auth';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    tags: ['auth'],
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
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  profile() {
    return { msg: 'this is protected' };
  }

  @Get('session')
  test(@Session() session) {
    session.count++;
    return session;
  }
}
