const { refreshAccessToken } = require('../auth')
const { authConfig } = require('../config')
const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')

module.exports = {
  plugin: {
    name: 'auth-refresh',
    register: (server, options) => {
      server.ext('onPostAuth', async (request, h) => {
        if (!authConfig.defraIdEnabled) {
          return h.continue
        }

        if (request.path.startsWith('/assets/')) {
          return h.continue
        }

        const currentToken = request.state[AUTH_COOKIE_NAME]
        const refreshToken = request.state[AUTH_REFRESH_COOKIE_NAME]

        if (!currentToken || !refreshToken) {
          return h.continue
        }

        const response = await refreshAccessToken(request.state[AUTH_REFRESH_COOKIE_NAME], authConfig)
        h.state(AUTH_COOKIE_NAME, response.access_token, authConfig.cookieOptions)
        return h.continue
      })
    }
  }
}
