import Cookie from 'js-cookie'




export const getToken = () => {
    return Cookie.get("app-token")
}


export const setToken = async (val: string) => {
    Cookie.set("app-token",val, {secure: true, sameSite: 'strict', path: '/', })
}

export const removeToken = () => {
    Cookie.remove("app-token")
}