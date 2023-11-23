const Joi = require('joi')
const { authConfig } = require('../config')
const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')
const { POST } = require('../constants/http-verbs')
const { getAccessToken } = require('../auth')

module.exports = {
  method: POST,
  path: '/sign-in-oidc',
  options: {
    auth: false,
    plugins: {
      crumb: false
    },
    validate: {
      payload: Joi.object({
        code: Joi.string().required()
      }).options({ stripUnknown: true }),
      failAction (request, h, err) {
        console.log(`Defra ID login failed: ${err}`)
        return h.view('/').code(401).takeover()
      }
    }
  },
  handler: async (request, h) => {
    const response = await getAccessToken(request.payload.code)
    return h.redirect('/home')
      .state(AUTH_COOKIE_NAME, response.access_token, authConfig.cookieOptions)
      .state(AUTH_REFRESH_COOKIE_NAME, response.refresh_token, authConfig.cookieOptions)
  }
}
