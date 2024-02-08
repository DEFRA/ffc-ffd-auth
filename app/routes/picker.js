const { GET } = require('../constants/http-verbs')
const { reselectOrganisation } = require('../auth/defra-id/reselect-organisation')

module.exports = [{
  method: GET,
  path: '/picker',
  handler: async (request, h) => {
    const redirect = request.query.redirect ?? '/landing-page/home'
    return h.redirect(await reselectOrganisation(redirect))
  }
}]
