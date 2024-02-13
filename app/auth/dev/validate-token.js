const validateToken = (decoded, _request, _h) => {
  const expired = new Date() > new Date(decoded.exp * 1000)
  if (!expired) {
    return { isValid: true, credentials: { scope: decoded.roles, name: 'A Farmer', crn: decoded.contactId } }
  }
  // refresh the token
  console.log(`Token expired at ${new Date(decoded.exp * 1000)}`)
}

module.exports = {
  validateToken
}
