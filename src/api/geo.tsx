import axiosBaseQuery from 'services/axiosBaseQuery/axiosBaseQuery'

import { AxiosResponse } from 'axios'

import { IOffice } from 'types/Office'

enum GeoEnum {
  ADD = 'office/geo/add',
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
