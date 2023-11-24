const { authConfig } = require('../config')
const { getKeys } = authConfig.defraIdEnabled ? require('./defra-id') : require('./dev')
const { RS256 } = require('../constants/algorithms')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

const getStrategy = async () => {
  const { publicKey } = await getKeys()
  return {
    key: publicKey,
    cookieKey: AUTH_COOKIE_NAME,
    verifyOptions: { algorithms: [RS256] }
  }
}

module.exports = {
  getStrategy
}
