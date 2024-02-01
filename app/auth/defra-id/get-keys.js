const Wreck = require('@hapi/wreck')
const jwkToPem = require('jwk-to-pem')
const { getWellKnown } = require('./get-well-known')

const getKeys = async () => {
  const { jwks_uri: url } = await getWellKnown()
  console.log(`Getting keys from ${url}`)
  const { payload } = await Wreck.get(url, {
    json: true
  })
  console.log('Got keys')
  console.log(payload)
  const { keys } = payload
  const pem = jwkToPem(keys[0])
  return { publicKey: pem }
}

module.exports = {
  getKeys
}
