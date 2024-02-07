const { authConfig } = require('../../config')
const { createState } = require('./create-state')
const { getWellKnown } = require('./get-well-known')

const reselectOrganisation = async (redirect) => {
  const { authorization_endpoint: url } = await getWellKnown()

  const state = createState(redirect)

  // TODO: setup nonce
  const query = [
    `p=${authConfig.policy}`,
    `client_id=${authConfig.clientId}`,
    `serviceId=${authConfig.serviceId}`,
    `state=${state}`,
    'nonce=defaultNonce',
    `redirect_uri=${authConfig.redirectUrl}`,
    `scope=openid offline_access ${authConfig.clientId}`,
    'response_type=code',
    'forceReselection=true',
    'prompt=none',
    'response_mode=form_post'
  ].join('&')
  return encodeURI(`${url}?${query}`)
}

module.exports = {
  reselectOrganisation
}
