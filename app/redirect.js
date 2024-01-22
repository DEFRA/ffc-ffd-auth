const getRedirectPath = (accessToken, refreshToken, redirect) => {
  if (!redirect) {
    redirect = '/landing-page/home'
  }

  const tokenParams = `token=${accessToken}&refreshToken=${refreshToken}`

  return redirect.includes('?') ? `${redirect}&${tokenParams}` : `${redirect}?${tokenParams}`
}

module.exports = {
  getRedirectPath
}
