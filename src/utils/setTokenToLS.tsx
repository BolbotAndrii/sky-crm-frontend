export const setTokenToLS = (token: any) => {
  localStorage.setItem('auth', JSON.stringify({ token }))
}
