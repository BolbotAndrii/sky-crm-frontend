import axiosBaseQuery from 'services/axiosBaseQuery/axiosBaseQuery'

import { AxiosResponse } from 'axios'

import { IOffice } from 'types/Office'

enum StatusEnum {
  ADD_STATUS_REQUEST = 'office/status/add',
  GET_STATUS_REQUEST = 'office/status/get',
  UPDATE_STATUS_REQUEST = 'office/status/update',
  DELETE_STATUS_REQUEST = 'office/status/delete',
}

interface OfficeData {
  data: IOffice[]
  meta: {
    page: number
    per_page: number
    pages: number
    total: number
  }
}

export const createRequestStatus = (data): Promise<OfficeData> => {
  return axiosBaseQuery
    .post(StatusEnum.ADD_STATUS_REQUEST, data)
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const updateRequestStatus = (data): Promise<OfficeData> => {
  return axiosBaseQuery
    .put(StatusEnum.UPDATE_STATUS_REQUEST, data)
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const getStatusRequest = (params): Promise<OfficeData> => {
  return axiosBaseQuery
    .get(StatusEnum.GET_STATUS_REQUEST, { params })
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const deleteStatusRequest = (params): Promise<OfficeData> => {
  return axiosBaseQuery
    .delete(StatusEnum.DELETE_STATUS_REQUEST, { params })
    .then((response: AxiosResponse<OfficeData>) => response.data)
}
