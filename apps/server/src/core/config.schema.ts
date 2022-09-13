import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE: Joi.object({
    TYPE: Joi.string().valid('postgres'),
    URL: Joi.string().uri(),
  }),
});
