const { getAuthorizationUrl } = require('./get-authorization-url')
const { getSignOutUrl } = require('./get-sign-out-url')
const { getAccessToken } = require('./get-access-token')
const { refreshAccessToken } = require('./refresh-access-token')
const { validateToken } = require('./validate-token')
const { getKeys } = require('./get-keys')

module.exports = {
  getAuthorizationUrl,
  getSignOutUrl,
  getAccessToken,
  refreshAccessToken,
  validateToken,
  getKeys
}
