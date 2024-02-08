const { GET } = require('../constants/http-verbs')
const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')
const { authConfig } = require('../config')
const { decodeState } = require('../auth/defra-id/decode-state')
const { getRedirectPath } = require('../auth/get-redirect-path')

module.exports = [{
  method: GET,
  path: '/sign-out-oidc',
  handler: async (request, h) => {
    const state = decodeState(request.query.state)
    const redirect = getRedirectPath(state.redirect)

    return h.view('sign-out', { redirect })
      .unstate(AUTH_COOKIE_NAME, authConfig.cookieOptions)
      .unstate(AUTH_REFRESH_COOKIE_NAME, authConfig.cookieOptions)
  }
}]
