const { createToken } = require('./create-token')

const getAccessToken = async (crn, password) => {
  // for development, no need to validate password, will always return a valid token
  console.log('Local development user authenticated')
  return createToken(crn)
}

module.exports = {
  getAccessToken
}
