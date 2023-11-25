const { GET } = require('../constants/http-verbs')
const { getKeys } = require('../auth')

module.exports = [{
  method: GET,
  path: '/public-key',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const { publicKey } = await getKeys()
    return h.response({ key: publicKey })
  }
}]
