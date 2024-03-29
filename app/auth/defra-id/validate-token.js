const { getScopes } = require('./get-scopes')

const validateToken = (decoded, _request, _h) => {
  return { isValid: true, credentials: { scope: getScopes(decoded.roles), name: `${decoded.firstName} ${decoded.lastName}`, crn: decoded.contactId } }
}

module.exports = {
  validateToken
}
