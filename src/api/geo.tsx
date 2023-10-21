import axiosBaseQuery from 'services/axiosBaseQuery/axiosBaseQuery'

import { AxiosResponse } from 'axios'

import { IOffice } from 'types/Office'

enum GeoEnum {
  ADD = 'office/geo/add',
  GET_BY_OFFICE_ID = 'office/geo/get',
  DELETE_GEO_UNIT = 'office/geo/delete',
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

export const createGeo = (data): Promise<OfficeData> => {
  return axiosBaseQuery
    .post(GeoEnum.ADD, data)
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const getGeo = (params): Promise<OfficeData> => {
  return axiosBaseQuery
    .get(GeoEnum.GET_BY_OFFICE_ID, { params })
    .then((response: AxiosResponse<OfficeData>) => response.data)
}

export const deleteGeoUnit = (params): Promise<OfficeData> => {
  return axiosBaseQuery
    .delete(GeoEnum.DELETE_GEO_UNIT, { params })
    .then((response: AxiosResponse<OfficeData>) => response.data)
}
