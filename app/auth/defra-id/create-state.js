const { v4: uuidv4 } = require('uuid')
const { STATE } = require('../../constants/cache-keys')

const createState = (cache, redirect) => {
  const state = Buffer.from(JSON.stringify({
    id: uuidv4(),
    redirect
  })).toString('base64')

  cache.set(STATE, state)

  return state
}

module.exports = {
  createState
}
