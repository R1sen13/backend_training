import Joi from 'joi';

export const environmentConfig = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  DATABASE_URL: Joi.string()
    .uri({
      scheme: ['postgres', 'postgresql'],
    })
    .required(),

  REDIS_URL: Joi.string()
    .uri({
      scheme: ['redis', 'rediss'],
    })
    .required(),

  S3_ENDPOINT: Joi.string()
    .uri({
      scheme: ['http', 'https'],
    })
    .required(),

  S3_REGION: Joi.string().required(),

  S3_BUCKET: Joi.string().min(3).required(),

  S3_ACCESS_KEY: Joi.string().min(3).required(),

  S3_SECRET_KEY: Joi.string().min(8).required(),
}).unknown(true);
