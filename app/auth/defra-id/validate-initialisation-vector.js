const { INITIALISATION_VECTOR } = require('../../constants/cache-keys')

const validateInitialisationVector = (cache, initialisationVector) => {
  const cachedInitialisationVector = cache.get(INITIALISATION_VECTOR)

  if (cachedInitialisationVector !== initialisationVector) {
    throw new Error('Invalid initialisation vector, possible token replay attack detected')
  }
}

module.exports = {
  validateInitialisationVector
}
