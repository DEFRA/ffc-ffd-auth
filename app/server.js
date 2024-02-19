const Hapi = require('@hapi/hapi')
const Joi = require('joi')
const { serverConfig, cacheConfig } = require('./config')

const createServer = async () => {
  const server = Hapi.server({
    port: serverConfig.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    },
    cache: [{
      name: cacheConfig.cacheName,
      provider: {
        constructor: cacheConfig.catbox,
        options: cacheConfig.catboxOptions
      }
    }]
  })

  const cache = server.cache({ cache: cacheConfig.cacheName, segment: cacheConfig.segment, expiresIn: cacheConfig.ttl })
  server.app.cache = cache

  server.validator(Joi)
  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('hapi-auth-jwt2'))
  await server.register(require('./plugins/auth'))
  // await server.register(require('./plugins/auth-refresh'))
  await server.register(require('./plugins/router'), { routes: { prefix: serverConfig.routePrefix } })
  await server.register(require('./plugins/errors'))
  await server.register(require('./plugins/crumb'))
  await server.register(require('./plugins/view-context'))
  await server.register(require('./plugins/logging'))
  await server.register(require('./plugins/session'))
  if (serverConfig.isDev) {
    await server.register(require('blipp'))
  }

  return server
}

module.exports = { createServer }
