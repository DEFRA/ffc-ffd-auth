const Joi = require('joi')
const { GET, POST } = require('../constants/http-verbs')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { authConfig } = require('../config')
const { getAccessToken, getAuthorizationUrl, getRedirectPath } = require('../auth')

module.exports = [{
  method: GET,
  path: '/sign-in',
  handler: async (request, h) => {
    const redirect = request.query.redirect ?? '/landing-page/home'

    if (request.auth.isAuthenticated) {
      return h.redirect(getRedirectPath(redirect))
    }

    if (authConfig.defraIdEnabled) {
      return h.redirect(await getAuthorizationUrl(request, redirect))
    }

    return h.view('sign-in', { redirect })
  }
},
{
  method: POST,
  path: '/sign-in',
  options: {
    validate: {
      payload: Joi.object({
        crn: Joi.number().integer().required(),
        password: Joi.string().required(),
        redirect: Joi.string().optional().allow('')
      }),
      failAction: async (request, h, _error) => {
        return h.view('sign-in', {
          message: 'Your CRN and/or password is incorrect',
          crn: request.payload.crn,
          redirect: request.payload.redirect
        }).takeover()
      }
    }
  },
  handler: async (request, h) => {
    const redirect = request.payload.redirect ?? '/landing-page/home'
    if (authConfig.defraIdEnabled) {
      return h.redirect(`/auth/sign-in?redirect=${redirect}`)
    }
    const token = await getAccessToken(request.payload.crn, request.payload.password)
    return h.redirect(getRedirectPath(redirect))
      .state(AUTH_COOKIE_NAME, token, authConfig.cookieOptions)
  }
}]
