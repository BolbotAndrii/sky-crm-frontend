import axiosBaseQuery from 'services/axiosBaseQuery/axiosBaseQuery'

import { AxiosResponse } from 'axios'

import { IOffice } from 'types/Office'

enum OfficeEnum {
  GET_LIST = 'office/full-list',
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
