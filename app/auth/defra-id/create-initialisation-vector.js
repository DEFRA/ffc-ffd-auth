const { v4: uuidv4 } = require('uuid')
const { INITIALISATION_VECTOR } = require('../../constants/cache-keys')

const createInitialisationVector = (request) => {
  const initialisationVector = uuidv4()
  request.yar.set(INITIALISATION_VECTOR, initialisationVector)
  return initialisationVector
}

module.exports = {
  createInitialisationVector
}
