const Joi = require('joi')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

const schema = Joi.object().keys({
  port: Joi.number().default(3001),
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT),
  serviceName: Joi.string().default('Farming Front Door'),
  routePrefix: Joi.string().default('/auth'),
  gatewayHost: Joi.string().required(),
  cookiePassword: Joi.string().required()
})

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  serviceName: process.env.SERVICE_NAME,
  routePrefix: process.env.ROUTE_PREFIX,
  gatewayHost: process.env.GATEWAY_HOST,
  cookiePassword: process.env.COOKIE_PASSWORD
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The server config is invalid. ${error.message}`)
}

value.isDev = value.env === DEVELOPMENT

module.exports = value
