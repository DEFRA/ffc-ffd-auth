const { v4: uuidv4 } = require('uuid')

const createState = (redirect) => {
  const state = {
    id: uuidv4(),
    redirect
  }
  return Buffer.from(JSON.stringify(state)).toString('base64')
}

module.exports = {
  createState
}
