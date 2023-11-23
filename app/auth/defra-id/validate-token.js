const { getScopes } = require('./get-scopes')

const validateToken = async (decoded, _request, _h) => {
  return { isValid: true, credentials: { scope: getScopes(decoded.roles), name: `${decoded.firstName} ${decoded.lastName}` } }
}

module.exports = {
  validateToken
}
