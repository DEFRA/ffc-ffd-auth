const getRedirectPath = (accessToken, refreshToken, redirect) => {
  if (!redirect) {
    redirect = '/landing-page/home'
  }

  return redirect
}

module.exports = {
  getRedirectPath
}
