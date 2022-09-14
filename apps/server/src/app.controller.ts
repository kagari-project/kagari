import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@kagari/auth';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  profile() {
    return { msg: 'this is protected' };
  }
}
