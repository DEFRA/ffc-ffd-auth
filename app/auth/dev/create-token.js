const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../../config').authConfig
const { USER } = require('../scopes')
const { RS256 } = require('../../constants/algorithms')
const { getKeys } = require('./get-keys')

const createToken = async (crn) => {
  const { privateKey } = await getKeys()
  return jwt.sign({
    nonce: 'defaultNonce',
    contactId: crn,
    roles: [USER]
  },
  privateKey,
  {
    expiresIn: `${jwtConfig.expiryInMinutes}m`,
    algorithm: RS256
  })
}

module.exports = {
  createToken
}
