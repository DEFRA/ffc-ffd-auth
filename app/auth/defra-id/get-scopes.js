const { USER } = require('../scopes')

const getScopes = (roles) => {
  const defraIdRoles = roles.map(role => {
    const roleData = role.split(':')
    return roleData.length > 1 ? roleData[1] : roleData[0]
  })
  const ffdRoles = [USER]
  return [...defraIdRoles, ...ffdRoles]
}

module.exports = {
  getScopes
}
