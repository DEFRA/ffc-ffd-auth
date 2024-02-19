const { STATE, INITIALISATION_VECTOR } = require('../constants/cache-keys')

const clearCache = (request) => {
  request.yar.clear(STATE)
  request.yar.clear(INITIALISATION_VECTOR)
}

module.exports = {
  clearCache
}
