const { authConfig } = require('../config')
const auth = authConfig.defraIdEnabled ? require('./defra-id') : require('./dev')
const { mapAuth } = require('./map-auth')
const { getRedirectPath } = require('./get-redirect-path')

module.exports = {
  ...auth,
  mapAuth,
  getRedirectPath
}
