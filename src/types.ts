import { Method, Role } from "./enums"

export type REQUEST_PARAMS_TYPE<T = any> = {
    url: string
    method: Method
    body?: T
}

export type RESPONSE_TYPE<T = any> = {
    statusCode: number
    message: string
    data: T
}

export type AUTH_BODY_TYPE = {
    role?: Role,
    email: string,
    password: string
}

export type AUTH_RESPONSE_TYPE = {
    id: any
    access_token: string
    role: Role
}
export type USER_TYPE = {
       id?: number | string
       name?: string
       email?: string
       role?: Role
}