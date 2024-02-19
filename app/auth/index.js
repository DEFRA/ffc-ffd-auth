const { authConfig } = require('../config')
const auth = authConfig.defraIdEnabled ? require('./defra-id') : require('./dev')
const { cacheRefreshToken } = require('./cache-refresh-token')
const { clearCache } = require('./clear-cache')
const { decodeState } = require('./decode-state')
const { getRedirectPath } = require('./get-redirect-path')
const { mapAuth } = require('./map-auth')

module.exports = {
  ...auth,
  cacheRefreshToken,
  clearCache,
  decodeState,
  getRedirectPath,
  mapAuth
}
