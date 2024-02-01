const getRedirectPath = (accessToken, refreshToken, redirect) => {
  if (!redirect) {
    redirect = '/landing-page/home'
  }

  // TODO: refactor as part of access code spike

  return redirect
}

module.exports = {
  getRedirectPath
}
