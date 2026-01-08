import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalSlice'
import authReducer from "./authSlice"
import premiumReducer from "./premiumSlice"
import anonReducer from "./anonSlice"


export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    premium: premiumReducer,
    anon: anonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch