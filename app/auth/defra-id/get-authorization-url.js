const { authConfig } = require('../../config')
const { createState } = require('./create-state')
const { createInitialisationVector } = require('./create-initialisation-vector')
const { getWellKnown } = require('./get-well-known')

const getAuthorizationUrl = async (request, redirect) => {
  const { authorization_endpoint: url } = await getWellKnown()

  const state = createState(request, redirect)
  const initialisationVector = createInitialisationVector(request)

  const query = [
    `p=${authConfig.policy}`,
    `client_id=${authConfig.clientId}`,
    `serviceId=${authConfig.serviceId}`,
    `state=${state}`,
    `nonce=${initialisationVector}`,
    `redirect_uri=${authConfig.redirectUrl}`,
    `scope=openid offline_access ${authConfig.clientId}`,
    'response_type=code',
    'response_mode=query'
  ].join('&')
  return encodeURI(`${url}?${query}`)
}

module.exports = {
  getAuthorizationUrl
}
