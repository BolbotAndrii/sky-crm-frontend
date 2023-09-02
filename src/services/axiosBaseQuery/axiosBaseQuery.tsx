import axios from 'axios'

import moment from 'moment-timezone'

import { store } from 'store/store'
import { logoutUser } from 'features/Login/authSlice'

const axiosBaseQuery = (() => {
  const params = {}
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'X-timezone': moment.tz.guess(),
  }

  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    params,
    headers,
  })
})()

axiosBaseQuery.interceptors.request.use(
  config => {
    const token = store.getState().auth.tokens?.refresh?.token

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => Promise.reject(error),
)
axiosBaseQuery.interceptors.response.use(
  data => data,
  error => {
    if (error.response?.status === 401) {
      store.dispatch(logoutUser())
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default axiosBaseQuery
