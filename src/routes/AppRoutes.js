import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, useLocation, Navigate } from 'react-router';
import DashboardPage from '../pages/Dashboard';
import UsersPage from '../pages/Users';
import ProfilePage from '../pages/Profile';
import RegisterPage from '../auth/Register';
import LoginPage from '../auth/Login';
import { useAppSelector } from '../store/store';
import ActivityLogsPage from '../pages/ActivityLogs';
const ProtectedRoute = ({ children, roles }) => {
    const { user, role } = useAppSelector(state => state.auth);
    const location = useLocation();
    if (!user) {
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    if (roles && !roles.includes(role)) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return children;
};
const AppRoutes = () => {
    const { user, isAuth, token } = useAppSelector(state => state.auth);
    return (_jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(ProtectedRoute, { roles: ['admin', 'user'], children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { roles: ['admin', 'user'], children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/users", element: _jsx(ProtectedRoute, { roles: ['admin'], children: _jsx(UsersPage, {}) }) }), _jsx(Route, { path: "/logs", element: _jsx(ProtectedRoute, { roles: ['admin'], children: _jsx(ActivityLogsPage, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { roles: ['admin', 'user'], children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "/profile/:id/view", element: _jsx(ProtectedRoute, { roles: ['admin'], children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "/profile/:id/edit", element: _jsx(ProtectedRoute, { roles: ['user', 'admin'], children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "/login", element: isAuth || token ? _jsx(Navigate, { to: "/" }) : _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: isAuth || token ? _jsx(Navigate, { to: "/" }) : _jsx(RegisterPage, {}) })] }));
};
export default AppRoutes;
