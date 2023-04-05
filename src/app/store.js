import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'
import globalReducer from "../features/global/globalSlice"
import generalReducer from '../features/general/generalSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    global: globalReducer,
    auth: authReducer,
    general: generalReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)