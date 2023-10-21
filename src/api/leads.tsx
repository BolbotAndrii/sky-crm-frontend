import axiosBaseQuery from 'services/axiosBaseQuery/axiosBaseQuery'

import { AxiosResponse } from 'axios'
import { ILead } from 'types/Lead'

enum LeadEnum {
  GET_LIST_LEADS = 'lead/leads-list',
  DELETE_LEAD = 'lead/delete',
  UPDATE_LEAD = 'lead/update',
  CREATE_LEAD_PUBLIC = 'lead/public-lead',
}

interface LeadsData {
  data: ILead[]
  meta: {
    page: number
    per_page: number
    pages: number
    total: number
  }
}

export const getLeadsList = (params: any): Promise<LeadsData> => {
  return axiosBaseQuery
    .get(LeadEnum.GET_LIST_LEADS, { params })
    .then((response: AxiosResponse<LeadsData>) => response.data)
}

export const deleteLead = (leadId: any): Promise<{ leadId: string }> => {
  return axiosBaseQuery
    .delete(`${LeadEnum.DELETE_LEAD}?leadId=${leadId}`)
    .then((response: AxiosResponse<any>) => response.data)
}

export const updateLead = (
  leadId: any,
  data,
): Promise<{ leadId: string; data: ILead }> => {
  return axiosBaseQuery
    .put(`${LeadEnum.UPDATE_LEAD}?leadId=${leadId}`, data)
    .then((response: AxiosResponse<ILead>) => response.data)
}

export const createPublicLead = (data): Promise<ILead> => {
  return axiosBaseQuery
    .post(LeadEnum.CREATE_LEAD_PUBLIC, data)
    .then((response: AxiosResponse<any>) => response.data)
}
