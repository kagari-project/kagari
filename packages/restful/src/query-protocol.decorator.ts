import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { serialize } from './serialize';
import * as Joi from 'joi';

const schema = Joi.object({
  $page: Joi.number().positive().integer().default(1),
  $pageSize: Joi.number().positive().integer().default(10),
  $withDeleted: Joi.boolean().default(false),
  $where: Joi.array(),
});

export const QueryProtocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const parsed = serialize(request._parsedUrl.query);
    try {
      return schema.validate(parsed, {
        abortEarly: true,
        convert: true,
      }).value;
    } catch (error) {
      throw new BadRequestException(error.message.details[0].message);
    }
  },
);
