const getRedirectPath = (redirect) => {
  if (!redirect) {
    redirect = '/landing-page/home'
  }

  return redirect
}

module.exports = {
  getRedirectPath
}
