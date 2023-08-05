import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload
    },
    resetToken: state => {
      state.token = ''
    },
  },
})

export const { setToken, resetToken } = authSlice.actions

export default authSlice.reducer
