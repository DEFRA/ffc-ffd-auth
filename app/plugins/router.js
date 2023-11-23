const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/assets'),
  require('../routes/sign-in'),
  require('../routes/sign-out'),
  require('../routes/sign-in-oidc')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
