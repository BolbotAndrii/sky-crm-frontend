export const getTokenFromLS = (): string | null => {
  const isAuth: string | null =
    JSON.parse(localStorage.getItem('auth') as string)?.token ?? null
  return isAuth
}
