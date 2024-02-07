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
      h.unstate(AUTH_COOKIE_NAME)
      h.unstate(AUTH_REFRESH_COOKIE_NAME)
      return h.redirect(await getSignOutUrl())
    }

    return h.redirect(`/auth/sign-out-oidc?redirect=${redirect}`)
  }
}]
