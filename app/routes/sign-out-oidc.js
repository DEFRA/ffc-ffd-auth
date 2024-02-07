const { GET } = require('../constants/http-verbs')
const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')
const { authConfig } = require('../config')

module.exports = [{
  method: GET,
  path: '/sign-out-oidc',
  handler: async (request, h) => {
    const redirect = request.query.redirect ?? '/landing-page'

    return h.view('sign-out', { redirect })
      .unstate(AUTH_COOKIE_NAME, authConfig.cookieOptions)
      .unstate(AUTH_REFRESH_COOKIE_NAME, authConfig.cookieOptions)
  }
}]
