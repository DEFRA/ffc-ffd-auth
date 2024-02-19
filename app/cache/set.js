const { cacheConfig } = require('../config')
const { getCache } = require('./get-cache')

const set = async (key, value) => {
  const cache = getCache()
  await cache.set(key, value, cacheConfig.ttl)
}

module.exports = { set }
