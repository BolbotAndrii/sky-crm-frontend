import axiosBaseQuery from 'services/axiosBaseQuery/axiosBaseQuery'

import { AxiosResponse } from 'axios'
import { IUser } from 'types/User'

enum UserEnum {
  GET_LIST_USERS = '/user/users-list',
  CREATE = '/user/create',
  UPDATE = '/user/update',
  DELETE = '/user/delete',
  GET_BY_ID = '/user/user',
}

interface UserData {
  data: IUser[]
  meta: {
    page: number
    per_page: number
    pages: number
    total: number
  }
}

export const getUsersList = (params: any): Promise<UserData> => {
  return axiosBaseQuery
    .get(UserEnum.GET_LIST_USERS, { params })
    .then((response: AxiosResponse<UserData>) => response.data)
}
export const getUserById = (params: any): Promise<UserData> => {
  return axiosBaseQuery
    .get(UserEnum.GET_BY_ID, { params })
    .then((response: AxiosResponse<UserData>) => response.data)
}

export const createUser = (data: IUser): Promise<UserData> => {
  return axiosBaseQuery
    .post(UserEnum.CREATE, data)
    .then((response: AxiosResponse<UserData>) => response.data)
}

export const updateUser = (
  data: IUser,
  params: IUser['id'],
): Promise<UserData> => {
  return axiosBaseQuery
    .put(UserEnum.UPDATE, data, { params })
    .then((response: AxiosResponse<UserData>) => response.data)
}

export const deleteUser = (params: IUser['id']): Promise<UserData> => {
  return axiosBaseQuery
    .delete(UserEnum.DELETE, { params })
    .then((response: AxiosResponse<UserData>) => response.data)
}
