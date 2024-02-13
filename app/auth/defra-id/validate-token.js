const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../../constants/cookies')
const { authConfig } = require('../../config')
const { getScopes } = require('./get-scopes')
const { refreshAccessToken } = require('./refresh-access-token')

const validateToken = async (decoded, request, h) => {
  const expired = new Date() > new Date(decoded.exp * 1000)
  if (!expired) {
    return { isValid: true, credentials: { scope: getScopes(decoded.roles), name: `${decoded.firstName} ${decoded.lastName}`, crn: decoded.contactId } }
  }
  // call refresh token
  const response = await refreshAccessToken(request.state[AUTH_REFRESH_COOKIE_NAME])
  h.state(AUTH_COOKIE_NAME, response.access_token, authConfig.cookieOptions)
  return h.continue
}

module.exports = {
  validateToken
}
