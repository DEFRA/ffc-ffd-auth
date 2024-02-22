const { INITIALISATION_VECTOR } = require('../../constants/cache-keys')
const { parseJwt } = require('./parse-jwt')

const validateInitialisationVector = (request, accessToken) => {
  const cachedInitialisationVector = request.yar.get(INITIALISATION_VECTOR)
  const initialisationVector = parseJwt(accessToken).nonce

  if (cachedInitialisationVector !== initialisationVector) {
    throw new Error('Invalid initialisation vector, possible token replay attack detected')
  }
}

module.exports = {
  validateInitialisationVector
}
