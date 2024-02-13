const Joi = require('joi')
const Boom = require('@hapi/boom')
const { POST } = require('../constants/http-verbs')
const { validateToken } = require('../auth')

module.exports = [{
  method: POST,
  path: '/validate',
  options: {
    auth: false,
    plugins: {
      crumb: false
    },
    validate: {
      payload: Joi.object({
        token: Joi.object().required()
      }),
      failAction: (_request, _h, error) => {
        return Boom.badRequest(error)
      }
    },
    handler: async (request, h) => {
      const result = await validateToken(request.payload.token, request, h)
      return h.response(result)
    }
  }
}]
