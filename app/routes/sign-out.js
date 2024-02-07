const { GET } = require('../constants/http-verbs')
const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')
const { authConfig } = require('../config')
const { getSignOutUrl } = require('../auth')

module.exports = [{
  method: GET,
  path: '/sign-out',
  handler: async (request, h) => {
    const redirect = request.query.redirect ?? '/landing-page'

    if (authConfig.defraIdEnabled) {
      return h.redirect(await getSignOutUrl())
        .unstate(AUTH_COOKIE_NAME, authConfig.cookieOptions)
        .unstate(AUTH_REFRESH_COOKIE_NAME, authConfig.cookieOptions)
    }

    return h.redirect(`/auth/sign-out-oidc?redirect=${redirect}`)
  }
}]
