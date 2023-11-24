const { GET } = require('../constants/http-verbs')
const { getStrategy } = require('../auth')

module.exports = [{
  method: GET,
  path: '/strategy',
  options: {
    auth: false
  },
  handler: async (request, h) => {
    const strategy = await getStrategy()
    return h.response(strategy)
  }
}]
