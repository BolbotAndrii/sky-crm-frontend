import axiosBaseQuery from 'services/axiosBaseQuery/axiosBaseQuery'

import { AxiosResponse } from 'axios'

import { IOffice } from 'types/Office'

enum OfficeEnum {
  GET = 'office/offices-list',
  GET_LIST = 'office/full-list',
  CREATE_OFFICE = 'office/create',
  CREATE_UPDATE = 'office/update',
  GET_OFFICE_BY_ID = 'office/office',
  GET_INTEGRA_BY_OFFICE_ID = 'office/integration/get-by-office-id',
  ADD_INTEGRATION = 'office/integration/add',
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

export const getOfficeList = (params: any): Promise<OfficeData> => {
  return axiosBaseQuery
    .get(OfficeEnum.GET_LIST, { params })
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const getOffices = (): Promise<null> => {
  return axiosBaseQuery
    .get(OfficeEnum.GET)
    .then((response: AxiosResponse<OfficeData['data']>) => response.data)
}

export const getOfficeById = (params: any): Promise<OfficeData> => {
  return axiosBaseQuery
    .get(OfficeEnum.GET_OFFICE_BY_ID, { params })
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const createOffice = (data: any): Promise<OfficeData> => {
  return axiosBaseQuery
    .post(OfficeEnum.CREATE_OFFICE, data)
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const updateOffice = (data: any, params): Promise<OfficeData> => {
  return axiosBaseQuery
    .put(OfficeEnum.CREATE_UPDATE, data, { params })
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const createOfficeItegration = (data: any): Promise<OfficeData> => {
  return axiosBaseQuery
    .post(OfficeEnum.ADD_INTEGRATION, data)
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const getOfficeItegrationById = (params): Promise<OfficeData> => {
  return axiosBaseQuery
    .get(OfficeEnum.GET_INTEGRA_BY_OFFICE_ID, { params })
    .then((response: AxiosResponse<OfficeData>) => response.data)
}
