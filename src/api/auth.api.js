import { Method } from "../enums";
import { callAPI } from "./callAPI";
const prefix = "auth";
export const loginAPI = async (body) => {
    const response = await callAPI({ url: `${prefix}/login`, method: Method.POST, body: body });
    return response;
};
export const registerAPI = async (body) => {
    const response = await callAPI({ url: `${prefix}/register`, method: Method.POST, body: body });
    return response;
};
