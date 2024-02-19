const Joi = require('joi')
const Boom = require('@hapi/boom')
const { GET } = require('../constants/http-verbs')
const { refreshAccessToken } = require('../auth')

module.exports = [{
  method: GET,
  path: '/refresh',
  options: {
    auth: false,
    plugins: {
      crumb: false
    },
    refresh: {
      payload: Joi.object({
        token: Joi.object().required,
        refreshToken: Joi.object().required
      }),
      failAction: (_request, _h, error) => {
        return Boom.badRequest(error)
      }
    },
    handler: (request, h) => {
      const result = refreshAccessToken(request.payload.token, request.payload.refreshToken)
      return h.response(result)
    }
  }
}]
