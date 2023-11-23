const { authConfig } = require('../../config')
const { getWellKnown } = require('./get-well-known')

const getAuthorizationUrl = async () => {
  const { authorization_endpoint: url } = await getWellKnown()

  const query = [
    `p=${authConfig.policy}`,
    `client_id=${authConfig.clientId}`,
    `serviceId=${authConfig.serviceId}`,
    'nonce=defaultNonce',
    `redirect_uri=${authConfig.redirectUrl}`,
    `scope=openid offline_access ${authConfig.clientId}`,
    'response_type=code',
    'prompt=login',
    'response_mode=form_post'
  ].join('&')
  return encodeURI(`${url}?${query}`)
}

module.exports = {
  getAuthorizationUrl
}
