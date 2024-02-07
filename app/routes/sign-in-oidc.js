const Joi = require('joi')
const { authConfig } = require('../config')
const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')
const { POST } = require('../constants/http-verbs')
const { getAccessToken, getRedirectPath } = require('../auth')
const { decodeState } = require('../auth/defra-id/decode-state')

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
        code: Joi.string().required(),
        state: Joi.string().required()
      }).options({ stripUnknown: true }),
      failAction (request, h, err) {
        console.log(`Defra ID login failed: ${err}`)
        return h.view('/sign-in').code(401).takeover()
      }
    }
  },
  handler: async (request, h) => {
    const response = await getAccessToken(request.payload.code)
    const state = decodeState(request.payload.state)
    const redirect = getRedirectPath(state.redirect)
    return h.redirect(redirect)
      .state(AUTH_COOKIE_NAME, response.access_token, authConfig.cookieOptions)
      .state(AUTH_REFRESH_COOKIE_NAME, response.refresh_token, authConfig.cookieOptions)
  }
}
