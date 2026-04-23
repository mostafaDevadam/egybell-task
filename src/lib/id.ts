import Cookie from 'js-cookie'


export const getID = () => {
    return Cookie.get("user-id")
}


export const setID = async (val: string) => {
    Cookie.set("user-id",val, {secure: true, sameSite: 'strict', path: '/', })
}

export const removeID = () => {
    Cookie.remove("user-id")
}