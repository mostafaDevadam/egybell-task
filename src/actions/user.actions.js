"use server";
import { deleteUserAPI, updateUserProfileAPI } from "../api/user.api";
export const updateUserAction = async (prev, formData) => {
    try {
        const response = await updateUserProfileAPI(formData.get("userId"), {
            //name: formData.get("name") as string, 
            email: formData.get("email"),
            role: formData.get("role")
        });
        console.log("updateUserAction response", response);
        return { success: true, data: response, message: response.message || "Updated Profile successful" };
    }
    catch (error) {
        console.log("error:", error);
        return { error: "Failed to update profile", message: "Failed to update profile" };
    }
};
export const deleteUserAction = async (id) => {
    try {
        const response = await deleteUserAPI(id);
        console.log("deleteUserAction response", response);
        return { success: true, data: response.data, message: response.message || "Deleted User Profile successful" };
    }
    catch (error) {
        console.log("error:", error);
        return { error: "Failed to delete user profile", message: "Failed to delete user profile" };
    }
};
