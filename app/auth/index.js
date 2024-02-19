const { authConfig } = require('../config')
const auth = authConfig.defraIdEnabled ? require('./defra-id') : require('./dev')
const { clearCache } = require('./clear-cache')
const { getRedirectPath } = require('./get-redirect-path')
const { mapAuth } = require('./map-auth')

module.exports = {
  ...auth,
  clearCache,
  getRedirectPath,
  mapAuth
}
