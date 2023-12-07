const { authConfig } = require('../config')
const auth = authConfig.defraIdEnabled ? require('./defra-id') : require('./dev')
const { mapAuth } = require('./map-auth')

module.exports = {
  ...auth,
  mapAuth
}
