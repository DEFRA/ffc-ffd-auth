const { STATE, INITIALISATION_VECTOR } = require('../../constants/cache-keys')

const clearCache = (cache) => {
  cache.clear(STATE)
  cache.clear(INITIALISATION_VECTOR)
}

module.exports = {
  clearCache
}
