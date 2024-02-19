const { STATE } = require('../../constants/cache-keys')

const validateState = (cache, state) => {
  const cachedState = cache.get(STATE)

  if (cachedState !== state) {
    throw new Error('Invalid state, possible CSRF attack detected')
  }
}

module.exports = {
  validateState
}
