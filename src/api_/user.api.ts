import { Method } from "../enums"
import { USER_TYPE } from "../types"
import { callAPI } from "./callAPI"


const prefix = "users"
export const getUsersAPI = async () => {
       const response = await callAPI<USER_TYPE[], any>({url: `${prefix}`, method: Method.GET})
       return response
}

export const getUserProfileAPI = async (id: any) => {
       const response = await callAPI<USER_TYPE , any>({url: `${prefix}/${id}`, method: Method.GET})
       return response
}

export const updateUserProfileAPI = async (id: any, data: USER_TYPE) => {
   const response = await callAPI<USER_TYPE , USER_TYPE>({url: `${prefix}/${id}`, method: Method.PATCH, body: data})
       return response
}