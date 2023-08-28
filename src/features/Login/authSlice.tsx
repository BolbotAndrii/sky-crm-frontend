import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, logout } from 'api/auth'
import { RootState } from 'store/store'

import { setTokenToLS } from 'utils/setTokenToLS'

interface User {
  // Здесь описываете поля пользователя
}

interface AuthState {
  loading: boolean
  user: User
  tokens: {
    access: { token: string; expires: string }
    refresh: { token: string; expires: string }
  }
  error: string | null
  success: boolean
}

interface LoginCredentials {
  email: string
  password: string
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const res = await login({ email, password })

      // setTokenToLS(res);
      return res
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    const refreshToken = (getState() as RootState).auth.tokens?.refresh?.token
    try {
      await logout({ refreshToken })
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const initialState: AuthState = {
  loading: false,
  user: {},
  tokens: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    //LOGIN
    [loginUser.pending]: state => {
      state.loading = true
      state.error = null
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.user = payload.user
      state.tokens = payload.tokens
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    //LOGOUT
    [logoutUser.pending]: state => {
      state.loading = true
      state.error = null
    },
    [logoutUser.fulfilled]: state => {
      state = initialState
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default authSlice.reducer
