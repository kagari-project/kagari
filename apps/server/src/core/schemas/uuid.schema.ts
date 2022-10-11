import * as Joi from 'joi';

export const UuidSchema = Joi.string().uuid().required();
