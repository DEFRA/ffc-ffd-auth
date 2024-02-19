const Joi = require('joi')
const { authConfig } = require('../config')
const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')
const { GET } = require('../constants/http-verbs')
const { getAccessToken, getRedirectPath } = require('../auth')
const { validateState, decodeState, validateInitialisationVector, clearCache } = require('../auth')

module.exports = {
  method: GET,
  path: '/sign-in-oidc',
  options: {
    auth: false,
    plugins: {
      crumb: false
    },
    validate: {
      query: Joi.object({
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
    validateState(request, request.query.state)
    const state = decodeState(request.query.state)
    const response = await getAccessToken(request.query.code)
    validateInitialisationVector(request, response.access_token)
    const redirect = getRedirectPath(state.redirect)
    clearCache(request)
    return h.redirect(redirect)
      .state(AUTH_COOKIE_NAME, response.access_token, authConfig.cookieOptions)
      .state(AUTH_REFRESH_COOKIE_NAME, response.refresh_token, authConfig.cookieOptions)
  }
}
