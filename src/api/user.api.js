import { Method } from "../enums";
import { callAPI } from "./callAPI";
const prefix = "users";
export const getUsersAPI = async () => {
    const response = await callAPI({ url: `${prefix}`, method: Method.GET });
    return response;
};
export const getUserProfileAPI = async (id) => {
    const response = await callAPI({ url: `${prefix}/${id}`, method: Method.GET });
    return response;
};
export const updateUserProfileAPI = async (id, data) => {
    const response = await callAPI({ url: `${prefix}/${id}`, method: Method.PATCH, body: data });
    return response;
};
export const deleteUserAPI = async (id) => {
    const response = await callAPI({ url: `${prefix}/${id}`, method: Method.DELETE });
    return response;
};
