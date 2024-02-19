const { getCache } = require('./get-cache')

const drop = async (key) => {
  const cache = getCache()
  await cache.drop(key)
}

module.exports = { drop }
