import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Session,
} from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from '@kagari/auth';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
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
  login(@Request() req, @Session() session) {
    console.log(session);
    return req.user;
  }

  @Post('logout')
  logout(@Request() request) {
    request.logOut();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  profile(@Request() request) {
    return request.user;
  }
}
