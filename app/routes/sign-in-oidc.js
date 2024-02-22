const Joi = require('joi')
const { authConfig } = require('../config')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { GET } = require('../constants/http-verbs')
const { validateState, decodeState, validateInitialisationVector, clearCache, getAccessToken, getRedirectPath } = require('../auth')
const { cacheRefreshToken } = require('../auth/cache-refresh-token')

module.exports = {
  method: GET,
  path: '/sign-in-oidc',
  options: {
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
    if (request.auth.isAuthenticated) {
      return h.redirect(getRedirectPath())
    }

    validateState(request, request.query.state)
    const state = decodeState(request.query.state)
    const { access_token: accessToken, redirect_token: refreshToken } = await getAccessToken(request.query.code)
    validateInitialisationVector(request, accessToken)
    const redirect = getRedirectPath(state.redirect)
    clearCache(request)
    cacheRefreshToken(request, refreshToken)
    return h.redirect(redirect)
      .state(AUTH_COOKIE_NAME, accessToken, authConfig.cookieOptions)
  }
}
