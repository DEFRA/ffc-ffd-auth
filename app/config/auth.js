const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = Joi.object().keys({
  defraIdEnabled: Joi.bool().default(false),
  wellKnownUrl: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().uri().required(), otherwise: Joi.string().allow('') }),
  clientId: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  clientSecret: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  serviceId: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  policy: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  redirectUrl: Joi.string().default('http://localhost:3000/sign-in-oidc'),
  devAuthPrivateKey: Joi.string().optional().allow(''),
  devAuthPublicKey: Joi.string().optional().allow(''),
  jwtConfig: Joi.object({
    expiryInMinutes: Joi.number().default(60)
  }),
  cookieOptions: Joi.object({
    ttl: Joi.number().default(1000 * 60 * 60 * 24), // 24 hours
    encoding: Joi.string().default('none'),
    isSameSite: Joi.string().valid('Lax').default('Lax'),
    isSecure: Joi.bool().default(true),
    isHttpOnly: Joi.bool().default(true),
    clearInvalid: Joi.bool().default(false),
    strictHeader: Joi.bool().default(true),
    path: Joi.string().default('/')
  })
})

const config = {
  defraIdEnabled: process.env.DEFRA_ID_ENABLED,
  wellKnownUrl: process.env.DEFRA_ID_WELL_KNOWN_URL,
  clientId: process.env.DEFRA_ID_CLIENT_ID,
  clientSecret: process.env.DEFRA_ID_CLIENT_SECRET,
  serviceId: process.env.DEFRA_ID_SERVICE_ID,
  redirectUrl: process.env.DEFRA_ID_REDIRECT_URL,
  policy: process.env.DEFRA_ID_POLICY,
  devAuthPrivateKey: process.env.DEV_AUTH_PRIVATE_KEY,
  devAuthPublicKey: process.env.DEV_AUTH_PUBLIC_KEY,
  jwtConfig: {
    expiryInMinutes: process.env.JWT_EXPIRY_IN_MINUTES
  },
  cookieOptions: {
    ttl: process.env.AUTH_COOKIE_TTL,
    encoding: process.env.AUTH_COOKIE_ENCODING,
    isSameSite: process.env.AUTH_COOKIE_SAME_SITE,
    isSecure: process.env.NODE_ENV === PRODUCTION,
    isHttpOnly: process.env.AUTH_COOKIE_HTTP_ONLY,
    clearInvalid: process.env.AUTH_COOKIE_CLEAR_INVALID,
    strictHeader: process.env.AUTH_COOKIE_STRICT_HEADER
  }
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The authentication config is invalid. ${error.message}`)
}

console.log(`Authentication mode: ${value.defraIdEnabled ? 'Defra ID' : 'Local'}`)

module.exports = value
