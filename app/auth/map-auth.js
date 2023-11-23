const { isInRole } = require('./is-in-role')
const { USER } = require('./scopes')

const mapAuth = (request) => {
  return {
    isAuthenticated: request.auth.isAuthenticated,
    isAnonymous: !request.auth.isAuthenticated,
    isUser: request.auth.isAuthenticated && isInRole(request.auth.credentials, USER),
    credentials: request.auth.credentials
  }
}

module.exports = {
  mapAuth
}
