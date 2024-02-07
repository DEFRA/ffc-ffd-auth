const { authConfig } = require('../../config')
const { getWellKnown } = require('./get-well-known')

const getSignOutUrl = async () => {
  const { end_session_endpoint: url } = await getWellKnown()

  const query = [
    `post_logout_redirect_uri=${authConfig.postLogoutRedirectUrl}`
  ].join('&')
  return encodeURI(`${url}?${query}`)
}

module.exports = {
  getSignOutUrl
}
