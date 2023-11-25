const decodeState = (state) => {
  return JSON.parse(Buffer.from(state, 'base64').toString('utf8'))
}

module.exports = {
  decodeState
}
