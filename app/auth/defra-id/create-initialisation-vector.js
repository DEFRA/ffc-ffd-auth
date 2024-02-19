const { v4: uuidv4 } = require('uuid')

const createInitialisationVector = () => {
  return uuidv4()
}

module.exports = {
  createInitialisationVector
}
