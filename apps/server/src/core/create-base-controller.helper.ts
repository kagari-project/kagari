import {
  Body,
  Controller,
  ControllerOptions,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Type,
} from '@nestjs/common';
import { InjectRepository, Repository } from '@kagari/database';

export function CreateBaseControllerHelper<Entity>(
  entity: Type<Entity>,
  controllerOptions: ControllerOptions,
): Type {
  @Controller(controllerOptions)
  class TargetController {
    constructor(
      @InjectRepository(entity) private repo: Repository<typeof entity>,
    ) {}

    @Get()
    async findAll() {
      const [list, total] = await this.repo.findAndCount();
      return { list, total };
    }

    @Get(':id')
    async findOne(@Param(':id') id: string) {
      return this.repo.findOneById(id);
    }

    @Put()
    async createOne(@Body() data: any) {
      return this.repo.create(data);
    }

    @Patch(':id')
    async updateOne(@Param(':id') id: string, @Body() data: any) {
      return this.repo.update(id, data);
    }

    @Delete(':id')
    async deleteOne(@Param(':id') id: string) {
      return this.repo.softDelete(id);
    }
  }
  return TargetController;
}
