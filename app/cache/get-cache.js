const { server } = require('../server')

const getCache = () => {
  return server.app.cache
}

module.exports = { getCache }
