const { serverConfig } = require('../config')
const { SESSION_COOKIE_NAME } = require('../constants/cookies')

module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    name: SESSION_COOKIE_NAME,
    storeBlank: true,
    maxCookieSize: 0,
    cookieOptions: {
      password: serverConfig.cookiePassword,
      isSecure: !serverConfig.isDev
    }
  }
}
