"use server"

import { deleteUserAPI, updateUserProfileAPI } from "../api/user.api"
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

export const deleteUserAction = async (id: any) => {
    try {
        const response = await deleteUserAPI(id)
        console.log("deleteUserAction response", response)
        return { success: true, data: response.data, message: response.message || "Deleted User Profile successful" }
    } catch (error) {
        console.log("error:", error)
        return { error: "Failed to delete user profile", message: "Failed to delete user profile" }
    }
}