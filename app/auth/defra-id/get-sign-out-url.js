const { authConfig } = require('../../config')
const { createState } = require('./create-state')
const { getWellKnown } = require('./get-well-known')

const getSignOutUrl = async (redirect, token) => {
  const { end_session_endpoint: url } = await getWellKnown()

  const state = createState(redirect)

  const query = [
    `post_logout_redirect_uri=${authConfig.postLogoutRedirectUrl}`,
    `id_token_hint=${token}`,
    `state=${state}`
  ].join('&')
  return encodeURI(`${url}?${query}`)
}

module.exports = {
  getSignOutUrl
}
