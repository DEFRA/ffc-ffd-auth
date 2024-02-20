const { serverConfig, cacheConfig, authConfig } = require('../config')
const { SESSION_COOKIE_NAME } = require('../constants/cookies')

module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    name: SESSION_COOKIE_NAME,
    storeBlank: false,
    maxCookieSize: 0,
    cache: {
      cache: cacheConfig.cacheName,
      expiresIn: cacheConfig.ttl,
      segment: cacheConfig.segment
    },
    cookieOptions: {
      ...authConfig.cookieOptions,
      encoding: undefined,
      password: serverConfig.cookiePassword
    }
  }
}
