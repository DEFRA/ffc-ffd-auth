const util = require('util')
const { generateKeyPair } = require('crypto')
const generateKeyPairPromise = util.promisify(generateKeyPair)
const { authConfig } = require('../../config')

let privateKey
let publicKey

const getKeys = async () => {
  if (authConfig.devAuthPrivateKey && authConfig.devAuthPublicKey) {
    privateKey = authConfig.devAuthPrivateKey
    publicKey = authConfig.devAuthPublicKey
  }

  if (!privateKey || !publicKey) {
    const { privateKey: newPrivateKey, publicKey: newPublicKey } = await generateKeyPairPromise('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    })
    privateKey = newPrivateKey
    publicKey = newPublicKey
  }

  return { privateKey, publicKey }
}

module.exports = {
  getKeys
}
