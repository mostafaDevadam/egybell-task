import { Method } from "../enums";
import { callAPI } from "./callAPI";
const prefix = "logs";
export const getLogsAPI = async () => {
    const response = await callAPI({ url: `${prefix}`, method: Method.GET });
    return response;
};
