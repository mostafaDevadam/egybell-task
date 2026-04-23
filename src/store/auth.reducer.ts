
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Role } from '../enums'
import { USER_TYPE } from '../types'


type STATE_TYPE = {
    user: USER_TYPE | null
    token: string | null
    role: Role | null
    isAuth: boolean
}


const initialState: STATE_TYPE = {
    user: null,
    token: null,
    role: Role.USER,
    isAuth: false,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log("action.payload:", action.payload)
            state.user = action.payload.user
            state.token = action.payload.token
            state.role = action.payload.role
            state.isAuth = Boolean(action.payload.token) //action.payload.token ? true : false
            console.log("state:", state)
        },
        setAuth: (state, action) => {
            console.log("setAuth:", action)
            state.isAuth = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
            //state.role = action.payload.user.role
        },
        setAuthToken: (state, action) => {
            state.token = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
        clearUser: (state) => {
            state.user = null
            state.isAuth = false
        },
        clearAll: (state) => {
            state.user = null
            state.token = null
            state.isAuth = false
            state.role = null
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.role = null
        },
    },
})





export const { login, logout, setUser, clearUser, clearAll, setAuth, setRole,setAuthToken } = AuthSlice.actions
export default AuthSlice.reducer