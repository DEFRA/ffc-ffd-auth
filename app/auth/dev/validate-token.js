const validateToken = (decoded, _request, _h) => {
  return { isValid: true, credentials: { scope: decoded.roles, name: 'Andrew Shaughnessy' } }
}

module.exports = {
  validateToken
}
