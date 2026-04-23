"use server"

import { loginAPI, registerAPI } from "../api/auth.api"
import { Role } from "../enums"
import { getToken, removeToken, setToken } from "../lib/token"
import { store } from "../store/store"
import { clearAll, login, setAuth, setUser } from "../store/auth.reducer"
import { getUserProfileAPI } from "../api/user.api"
import { removeID, setID } from "../lib/id"
import { removeRole, setRole } from "../lib/role"
export const registerAction = async (prev: any, formData: FormData) => {
    console.log("formData:", formData)

    try {
        const response = await registerAPI({ role: formData.get("role") as Role, email: formData.get("email") as string, password: formData.get("password") as string })
        console.log("registerAction response:", response)

        return { success: true, data: response, message: response.message || "Registration successful" }
    } catch (error) {
        return { error: "Failed to Registration", message: "Failed to Registration" }
    }
}


export const loginAction = async (prev: any, formData: FormData) => {


    try {
        const response = await loginAPI({ email: formData.get("email") as string, password: formData.get("password") as string })
        console.log("loginAction response:", response)
        setToken(response.data.access_token)
        setID(response.data.id)
        setRole(response.data.role)
        const user = (await getUserProfileAPI(response.data.id)).data
        console.log("in login Action user:", user)
        store.dispatch(login({ user: user, token: response.data.access_token, role: response.data.role }))
        //store.dispatch(setAuth(true))
        return { success: true, data: response, message: response.message || "Login successful" }
    } catch (error) {
        return { error: "Failed to login", message: "Failed to login" }
    }

}



export const logoutAction = async () => {
    removeToken()
    removeID()
    removeRole()
    store.dispatch(clearAll())

}
