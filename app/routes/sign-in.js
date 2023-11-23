const Joi = require('joi')
const { GET, POST } = require('../constants/http-verbs')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { authConfig } = require('../config')
const { getAccessToken, getAuthorizationUrl } = require('../auth')

module.exports = [{
  method: GET,
  path: '/sign-in',
  handler: async (request, h) => {
    if (request.auth.isAuthenticated) {
      return h.redirect('/home')
    }

    if (authConfig.defraIdEnabled) {
      return h.redirect(await getAuthorizationUrl())
    }

    return h.view('sign-in')
  }
},
{
  method: POST,
  path: '/sign-in',
  options: {
    validate: {
      payload: Joi.object({
        crn: Joi.number().integer().required(),
        password: Joi.string().required()
      }),
      failAction: async (request, h, _error) => {
        return h.view('sign-in', {
          message: 'Your CRN and/or password is incorrect',
          crn: request.payload.crn
        }).takeover()
      }
    }
  },
  handler: async (request, h) => {
    if (authConfig.defraIdEnabled) {
      return h.redirect('/sign-in')
    }
    const token = await getAccessToken(request.payload.crn, request.payload.password)
    return h.redirect('/home')
      .state(AUTH_COOKIE_NAME, token, authConfig.cookieOptions)
  }
}]
