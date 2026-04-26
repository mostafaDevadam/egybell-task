import Cookie from 'js-cookie';
export const getRole = () => {
    return Cookie.get("role");
};
export const setRole = async (val) => {
    Cookie.set("role", val, { secure: true, sameSite: 'strict', path: '/', });
};
export const removeRole = () => {
    Cookie.remove("role");
};
