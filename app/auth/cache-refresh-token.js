const { REFRESH_TOKEN } = require('../constants/cache-keys')

const cacheRefreshToken = (request, token) => {
  request.yar.set(REFRESH_TOKEN, token)
}

module.exports = {
  cacheRefreshToken
}
