"use server"

import { loginAPI, registerAPI } from "../api/auth.api"
import { Role } from "../enums"
import { getToken, removeToken, setToken } from "../lib/token"
import { store } from "../store/store"
import { clearAll, login, setAuth, setUser } from "../store/auth.reducer"
import { getUserProfileAPI } from "../api/user.api"
import { removeID, setID } from "../lib/id"
import { removeRole, setRole } from "../lib/role"
import { APP_ACCESS_TOKEN, APP_REFRESH_TOKEN } from "../key"
export const registerAction = async (prev: any, formData: FormData) => {
    console.log("formData:", formData)

    try {
        const response = await registerAPI({ role: formData.get("role") as Role, email: formData.get("email") as string, password: formData.get("password") as string })
        console.log("registerAction response:", response)

        return { success: true, data: response, message: response.message || "Registration successful", message_ar: response.message_ar || "تم التسجيل بنجاح" }
    } catch (error) {
        return { error: "Failed to Registration", message: "Failed to Registration", message_ar: "فشل التسجيل" }
    }
}


export const loginAction = async (prev: any, formData: FormData) => {


    try {
        const response = await loginAPI({ email: formData.get("email") as string, password: formData.get("password") as string })
        if(!response) return { error: "Failed to login", message: "Failed to login" }
        console.log("loginAction response:", response)
        setToken(APP_ACCESS_TOKEN,response.data.access_token)
        setToken(APP_REFRESH_TOKEN,response.data.refresh_token)
        setID(response.data.id)
        setRole(response.data.role)
        const user = (await getUserProfileAPI(response.data.id)).data
        console.log("in login Action user:", user)
        store.dispatch(login({ user: user, token: response.data.access_token, role: response.data.role }))
        //store.dispatch(setAuth(true))
        return { success: true, data: response, message: response.message || "Login successful", message_ar: response.message_ar || "تم تسجيل الدخول بنجاح" }
    } catch (error) {
        return { error: "Failed to login", message: "Failed to login", message_ar: "فشل تسجيل الدخول" }
    }

}



export const logoutAction = async () => {
    removeToken(APP_ACCESS_TOKEN)
     removeToken(APP_REFRESH_TOKEN)
    removeID()
    removeRole()
    store.dispatch(clearAll())

}
