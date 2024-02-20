const Joi = require('joi')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  host: Joi.string(),
  port: Joi.number().integer().default(6379),
  password: Joi.string().allow(''),
  partition: Joi.string().default('ffc-ffd-auth'),
  cacheName: Joi.string().default('ffc-ffd-auth'),
  segment: Joi.string().default('ffc-ffd-auth'),
  ttl: Joi.number().integer().default(1000 * 60 * 60 * 24) // 24 hours
})

const config = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  partition: process.env.REDIS_PARTITION,
  cacheName: process.env.REDIS_CACHE_NAME,
  segment: process.env.REDIS_TOKEN_SEGMENT,
  ttl: process.env.REDIS_TTL
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The cache config is invalid. ${result.error.message}`)
}

const value = result.value

value.isDev = (process.env.NODE_ENV === DEVELOPMENT || process.env.NODE_ENV === TEST)
value.isTest = process.env.NODE_ENV === TEST
value.isProd = process.env.NODE_ENV === PRODUCTION

value.useRedis = !(value.isTest || value.host === undefined)

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

value.catboxOptions = value.useRedis
  ? {
      host: value.host,
      port: value.port,
      password: value.password,
      partition: value.partition,
      tls: value.isDev ? undefined : {}
    }
  : {}

value.catbox = value.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')

module.exports = value
