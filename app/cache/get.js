const { getCache } = require('./get-cache')

const get = async (key) => {
  const cache = getCache()
  return cache.get(key)
}

module.exports = { get }
