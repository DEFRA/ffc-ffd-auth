const { GET } = require('../constants/http-verbs')
const { reselectOrganisation } = require('../auth/defra-id/reselect-org')
// const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')
// const { authConfig } = require('../config')
// const { getAccessToken, getAuthorizationUrl, getRedirectPath } = require('../auth')

module.exports = [{
  method: GET,
  path: '/picker',
  handler: async (request, h) => {
    console.log('hello from picker')
    const redirect = request.query.redirect ?? '/landing-page/home'
    return h.redirect(await reselectOrganisation(redirect))

    // if (request.auth.isAuthenticated) {
    // }

    // if (authConfig.defraIdEnabled) {
    //   return h.redirect(await getAuthorizationUrl(redirect))
    // }

    // return h.view('sign-in', { redirect })
  }
}]
