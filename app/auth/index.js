const { authConfig } = require('../config')
const auth = authConfig.defraIdEnabled ? require('./defra-id') : require('./dev')
const { mapAuth } = require('./map-auth')
const { getStrategy } = require('./get-strategy')

module.exports = {
  ...auth,
  mapAuth,
  getStrategy
}
