import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import ViewProfile from '../components/views/ViewProfile';
import EditProfile from '../components/EditProfile';
import { useAppSelector } from '../store/store';
import { Role } from '../enums';
import { getUserProfileAPI } from '../api/user.api';
const ProfilePage = () => {
    const { id } = useParams();
    const { role, user: currentUser } = useAppSelector(state => state.auth);
    const { pathname } = useLocation();
    const [isView, setIsView] = useState(false);
    const [user, setUser] = useState(null);
    const [isOwn, setIsOwn] = useState(false);
    useEffect(() => {
        if (pathname.includes("edit")) {
            setIsView(false);
        }
        else if (pathname.includes("view")) {
            setIsView(true);
        }
        else if (pathname.endsWith("profile")) {
            setIsView(false);
        }
    }, [pathname]);
    useEffect(() => {
        if (id) {
            getUserProfileAPI(id).then((th) => {
                setUser(th.data);
            });
        }
    }, [id, role]);
    useEffect(() => {
        if (!id) {
            setIsOwn(true);
            setUser(currentUser);
        }
    }, [user, role]);
    useEffect(() => {
        console.log("currentUser:", currentUser);
    }, [currentUser]);
    console.log("profile:", id, pathname);
    return (_jsxs("div", { children: [_jsx("h1", {}), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }) }), !isView && role === Role.ADMIN && user && id && _jsx(EditProfile, { user: user }), isView && role === Role.ADMIN && user && id && _jsx(ViewProfile, { user: user }), !id && _jsx(ViewProfile, { user: currentUser }), (id && isOwn && role == Role.USER) && _jsx(EditProfile, { user: currentUser })] }));
};
export default ProfilePage;
