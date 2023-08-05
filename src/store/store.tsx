import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ui from './ui/UISlice'

const rootReducer = combineReducers({
  ui,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
