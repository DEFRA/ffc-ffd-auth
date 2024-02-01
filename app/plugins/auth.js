const { getKeys, validateToken } = require('../auth')
const { RS256 } = require('../constants/algorithms')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

module.exports = {
  plugin: {
    name: 'auth',
    register: async (server, _options) => {
      const { publicKey } = await getKeys()

      server.auth.strategy('jwt', 'jwt', {
        key: publicKey,
        cookieKey: AUTH_COOKIE_NAME,
        validate: validateToken,
        verifyOptions: { algorithms: [RS256] }
      })
      server.auth.default({ strategy: 'jwt', mode: 'try' })
    }
  }
}
