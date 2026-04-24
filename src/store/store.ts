import { configureStore } from '@reduxjs/toolkit'
import AuthSlice, { setUser } from './auth.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Role } from '../enums'

export const store = configureStore({
  reducer: {
    "auth": AuthSlice
},
})




//export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

