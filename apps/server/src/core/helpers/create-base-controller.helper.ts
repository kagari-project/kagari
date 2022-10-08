/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  FindManyOptions,
  FindOneOptions,
  InjectRepository,
  Repository,
} from '@kagari/database';
import { ParsedQueryString, QueryProtocol } from '@kagari/restful';
import { transformProtocolHelper } from './transform-protocol.helper';

export type BaseController<Entity> = Type<{
  findAll(...args: any[]): Promise<{ list: Type<Entity>[]; total: number }>;
  findOne(...args: any[]): Promise<Type<Entity>>;
  createOne(...args: any[]): Promise<Type<Entity>>;
  updateOne(...args: any[]): Promise<Type<Entity>>;
  deleteOne(...args: any[]): Promise<Type<Entity>>;
}>;

export function CreateBaseControllerHelper<Entity>(
  entity: Type<Entity>,
  controllerOptions: ControllerOptions,
): BaseController<Entity> {
  @Controller(controllerOptions)
  class TargetController {
    constructor(@InjectRepository(entity) private repo: Repository<Entity>) {}

    @Get()
    async findAll(@QueryProtocol() query: ParsedQueryString) {
      const findOptions = transformProtocolHelper(query);
      const [list, total] = await this.repo.findAndCount(findOptions);
      return { list, total, query };
    }

    @Get(':id')
    async findOne(@Param(':id') id: string) {
      return this.repo.findOneOrFail({ where: { id } } as FindOneOptions);
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
  return TargetController as unknown as BaseController<Entity>;
}
