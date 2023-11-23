const Wreck = require('@hapi/wreck')
const { authConfig } = require('../../config')

const getWellKnown = async () => {
  const { payload } = await Wreck.get(authConfig.wellKnownUrl, {
    json: true
  })

  return payload
}

module.exports = {
  getWellKnown
}
