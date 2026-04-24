import Cookie from 'js-cookie'




export const getToken = (key: string) => {
    return Cookie.get(key)
}


export const setToken = async (key: string,val: string) => {
    Cookie.set(key, val, {secure: true, sameSite: 'strict', path: '/', })
}

export const removeToken = (key: string) => {
    Cookie.remove(key)
}