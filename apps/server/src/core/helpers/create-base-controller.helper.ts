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
import { FindOneOptions, InjectRepository, Repository } from '@kagari/database';
import { ParsedQueryString, QueryProtocol } from '@kagari/restful';
import { transformProtocolHelper } from './transform-protocol.helper';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import * as _ from 'lodash';
import { UuidSchema } from '../schemas/uuid.schema';
import { ApiOperation } from '@nestjs/swagger';

type ControllerMethods<Entity> = {
  findAll(...args: any[]): Promise<{ list: Type<Entity>[]; total: number }>;
  findOne(...args: any[]): Promise<Type<Entity>>;
  createOne(...args: any[]): Promise<Type<Entity>>;
  updateOne(...args: any[]): Promise<Type<Entity>>;
  deleteOne(...args: any[]): Promise<Type<Entity>>;
};
export type BaseController<Entity> = Type<ControllerMethods<Entity>>;

type Validators<Entity> = Partial<
  Record<keyof ControllerMethods<Entity> | 'id', JoiValidationPipe>
>;

type CreateBaseControllerHelperOptions<Entity = any> = {
  controllerOptions: ControllerOptions;
  validators?: Validators<Entity>;
};

const DEFAULT_OPTIONS: Partial<CreateBaseControllerHelperOptions> = {
  validators: {
    id: new JoiValidationPipe(UuidSchema),
  },
};

export function CreateBaseControllerHelper<Entity>(
  entity: Type<Entity>,
  settings: CreateBaseControllerHelperOptions<Entity>,
): BaseController<Entity> {
  const options = _.defaultsDeep(
    settings,
    DEFAULT_OPTIONS,
  ) as CreateBaseControllerHelperOptions;

  @Controller(options.controllerOptions)
  class TargetController {
    constructor(@InjectRepository(entity) private repo: Repository<Entity>) {}

    @ApiOperation({
      tags: [entity.name],
    })
    @Get()
    async findAll(
      @QueryProtocol(options.validators.findAll)
      query: ParsedQueryString,
    ) {
      const findOptions = transformProtocolHelper(query);
      const [list, total] = await this.repo.findAndCount(findOptions);
      return { list, total, query };
    }

    @ApiOperation({
      tags: [entity.name],
    })
    @Get(':id')
    async findOne(
      @Param('id', options.validators.id)
      id: string,
    ) {
      return this.repo.findOneOrFail({ where: { id } } as FindOneOptions);
    }

    @ApiOperation({
      tags: [entity.name],
    })
    @Put()
    async createOne(
      @Body(options.validators.createOne)
      data: any,
    ) {
      return this.repo.save(data);
    }

    @ApiOperation({
      tags: [entity.name],
    })
    @Patch(':id')
    async updateOne(
      @Param('id', options.validators.id)
      id: string,
      @Body(options.validators.updateOne)
      data: any,
    ) {
      return this.repo.update(id, data);
    }

    @ApiOperation({
      tags: [entity.name],
    })
    @Delete(':id')
    async deleteOne(
      @Param('id', options.validators.id)
      id: string,
    ) {
      return this.repo.softDelete(id);
    }
  }
  return TargetController as unknown as BaseController<Entity>;
}
