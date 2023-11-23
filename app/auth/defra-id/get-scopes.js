const getScopes = (roles) => {
  return roles.map(role => {
    const roleData = role.split(':')
    return roleData.length > 1 ? roleData[1] : roleData[0]
  })
}

module.exports = {
  getScopes
}
