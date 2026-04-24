import { Method } from "../enums"
import { AUTH_BODY_TYPE, AUTH_RESPONSE_TYPE } from "../types"
import { callAPI } from "./callAPI"


const prefix = "auth"
export const loginAPI = async (body: AUTH_BODY_TYPE) => {
    const resp = await fetch('/api/v1.1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body })
    });

    console.log("resp:", resp)


    const response = await callAPI<AUTH_RESPONSE_TYPE, AUTH_BODY_TYPE>({ url: `${prefix}/login`, method: Method.POST, body: body })
    return response
}

export const registerAPI = async (body: AUTH_BODY_TYPE) => {
    const response = await callAPI({ url: `${prefix}/register`, method: Method.POST, body: body })
    return response
}
