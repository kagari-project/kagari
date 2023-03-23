import { Controller, Get, Render, UseFilters } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class MvcController {
  @Get()
  @Render('pages/home')
  getHome() {
    throw new Error();
    return {};
  }
}
