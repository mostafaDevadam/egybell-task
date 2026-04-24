import { Method } from "../enums"
import { LOG_TYPE } from "../types"
import { callAPI } from "./callAPI"


const prefix ="logs"
export const getLogsAPI = async () => {
    const response = await callAPI<LOG_TYPE[], any>({url: `${prefix}`, method: Method.GET})
    return response
}