const { getScopes } = require('./get-scopes')
const { refreshAccessToken } = require('./refresh-access-token')

const validateToken = (decoded, _request, _h) => {
  const expired = new Date() > new Date(decoded.exp * 1000)
  if (!expired) {
    return { isValid: true, credentials: { scope: getScopes(decoded.roles), name: `${decoded.firstName} ${decoded.lastName}`, crn: decoded.contactId } }
  }
  // call refresh token
  refreshAccessToken
}

module.exports = {
  validateToken
}
