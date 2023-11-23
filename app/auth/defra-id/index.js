const { getAuthorizationUrl } = require('./get-authorization-url')
const { getAccessToken } = require('./get-access-token')
const { refreshAccessToken } = require('./refresh-access-token')
const { validateToken } = require('./validate-token')
const { getKeys } = require('./get-keys')

module.exports = {
  getAuthorizationUrl,
  getAccessToken,
  refreshAccessToken,
  validateToken,
  getKeys
}
