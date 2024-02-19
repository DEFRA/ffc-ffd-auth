const { GET } = require('../constants/http-verbs')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { authConfig } = require('../config')
const { decodeState, getRedirectPath, clearCache } = require('../auth/decode-state')

module.exports = [{
  method: GET,
  path: '/sign-out-oidc',
  handler: async (request, h) => {
    const state = decodeState(request.query.state)
    const redirect = getRedirectPath(state.redirect)

    clearCache(request)

    return h.view('sign-out', { redirect })
      .unstate(AUTH_COOKIE_NAME, authConfig.cookieOptions)
  }
}]
