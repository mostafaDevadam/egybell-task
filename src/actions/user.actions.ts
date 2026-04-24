"use server"

import { updateUserProfileAPI } from "../api_/user.api"
import { Role } from "../enums"


export const updateUserAction = async (prev: any, formData: FormData) => {
    try {
        const response = await updateUserProfileAPI(formData.get("userId") as string,
            {
                //name: formData.get("name") as string, 
                email: formData.get("email") as string,
                role: formData.get("role") as Role
            })
        console.log("updateUserAction response", response)
        return { success: true, data: response, message: response.message || "Updated Profile successful" }
    } catch (error) {
        console.log("error:", error)
        return { error: "Failed to update profile", message: "Failed to update profile" }
    }
}