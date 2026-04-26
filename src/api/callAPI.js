import { getToken } from "../lib/token";
const isProd = import.meta.env.VITE_NODE_ENV === 'production';
const baseUrl = `${isProd ? import.meta.env.VITE_LIVE_API_URL : import.meta.env.VITE_API_URL}`;
export const callAPI = async ({ url, method, body }) => {
    const token = getToken();
    const apiUrl = `${baseUrl}/${url}`;
    console.log("apiUrl:", apiUrl);
    const response = await fetch(apiUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store',
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
};
