import { APP_ACCESS_TOKEN, APP_REFRESH_TOKEN } from "../key";
import { getToken, setToken } from "../lib/token";
import { AUTH_RESPONSE_TYPE, REQUEST_PARAMS_TYPE, RESPONSE_TYPE } from "../types";

const baseUrl = `${import.meta.env.VITE_API_URL}`

const refresh = async (refresh_token: string) => {
    if (!refresh_token) throw new Error('No refresh token available');

    const res = await fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({ refresh_token })
    });
    return await res.json() as RESPONSE_TYPE<AUTH_RESPONSE_TYPE>

}
export const callAPI = async <S, B>({ url, method, body }: REQUEST_PARAMS_TYPE<B>) => {
    const access_token = getToken(APP_ACCESS_TOKEN)
    const refresh_token = getToken(APP_REFRESH_TOKEN)

    const doFetch = async (token: string): Promise<Response> => {
        return await fetch(`${baseUrl}/${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store',
            body: JSON.stringify(body),
        });
    }

    let response = await doFetch(access_token!!)

    if (response.status == 401) {
        console.log("Error 401:", response)
        const refresh_response = await refresh(refresh_token!!)
        setToken(APP_ACCESS_TOKEN, refresh_response.data.access_token)
        setToken(APP_REFRESH_TOKEN, refresh_response.data.refresh_token)
        console.log("refresh_response:", refresh_response)
        response = await doFetch(refresh_response.data.access_token!!)

    }

    const data = await response.json()
    return data as RESPONSE_TYPE<S>

}