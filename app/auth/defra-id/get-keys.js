const Wreck = require('@hapi/wreck')
const jwkToPem = require('jwk-to-pem')
const { getWellKnown } = require('./get-well-known')

const getKeys = async () => {
  const { jwks_uri: url } = await getWellKnown()
  const { payload } = await Wreck.get(url, {
    json: true
  })

  const { keys } = payload
  const pem = jwkToPem(keys[0])
  return { publicKey: pem }
}

module.exports = {
  getKeys
}
