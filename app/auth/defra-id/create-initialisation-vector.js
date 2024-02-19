const { v4: uuidv4 } = require('uuid')
const { INITIALISATION_VECTOR } = require('../../constants/cache-keys')

const createInitialisationVector = (cache) => {
  const initialisationVector = uuidv4()
  cache.set(INITIALISATION_VECTOR, initialisationVector)
  return initialisationVector
}

module.exports = {
  createInitialisationVector
}
