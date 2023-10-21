import axiosBaseQuery from 'services/axiosBaseQuery/axiosBaseQuery'

import { AxiosResponse } from 'axios'

enum AuthEnum {
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  REFRESH = '/auth/refresh',
}

export const login = (data: {
  email: string
  password: string
}): Promise<AxiosResponse<any, any>> => {
  return axiosBaseQuery.post(AuthEnum.LOGIN, data).then(data => data.data)
}
export const logout = (data: {
  refreshToken: string
}): Promise<AxiosResponse<any, any>> => {
  return axiosBaseQuery.post(AuthEnum.LOGOUT, data).then(data => data.data)
}

export const refresh = (data: {
  refreshToken: string
}): Promise<AxiosResponse<any, any>> => {
  return axiosBaseQuery.post(AuthEnum.REFRESH, data).then(data => data.data)
}
