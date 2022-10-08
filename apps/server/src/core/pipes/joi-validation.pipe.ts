/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Schema } from 'joi';

export class JoiValidationPipe<Input = any, Output = any>
  implements PipeTransform
{
  constructor(private schema: Schema) {}

  async transform(query: Input): Promise<Output> {
    try {
      const { value } = await this.schema.validateAsync(query, {
        convert: true,
        abortEarly: true,
      });
      return value as Output;
    } catch (error) {
      throw new BadRequestException(error.details[0].message);
    }
  }
}
