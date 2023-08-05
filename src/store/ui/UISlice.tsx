import { createSlice } from '@reduxjs/toolkit'

const UiSlice = createSlice({
  name: 'UI',
  initialState: {
    isOpen: false,
    theme: 'dark',
  },
  reducers: {
    toggleMenu: state => {
      state.isOpen = !state.isOpen
    },
    changeAppTheme: (state, { payload }) => {
      state.theme = payload
    },
  },
})

export const { toggleMenu, changeAppTheme } = UiSlice.actions

export default UiSlice.reducer
