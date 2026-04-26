import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
//import './App.css'
import Navbar from './components/layouts/Navbar';
import AppRoutes from './routes/AppRoutes';
import { Slide, ToastContainer } from 'react-toastify';
import { getToken } from './lib/token';
import { getID } from './lib/id';
import { getRole } from './lib/role';
import { useAppDispatch } from './store/store';
import { getUserProfileAPI } from './api/user.api';
import { setAuth, setAuthToken, setRole, setUser } from './store/auth.reducer';
function App() {
    const token = getToken();
    const id = getID();
    const role = getRole();
    console.log("app token:", token);
    console.log("app id:", id);
    console.log("app role:", role);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (token && id && role) {
            dispatch(setAuthToken(token));
            dispatch(setRole(role));
            dispatch(setAuth(true));
            getUserProfileAPI(id).then((th) => {
                console.log("th:", th.data);
                dispatch(setUser(th.data));
            });
        }
    }, [token, id, role]);
    return (_jsxs("div", { children: [_jsx("header", { children: _jsx(Navbar, {}) }), _jsx("main", { children: _jsx(AppRoutes, {}) }), _jsx(ToastContainer, { transition: Slide, position: "top-right", className: "", autoClose: 5000, hideProgressBar: false, newestOnTop: false, closeOnClick: false, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true, theme: "dark" })] }));
}
export default App;
