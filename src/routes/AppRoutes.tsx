import React, { ReactNode } from 'react'
import { Routes, Route, useLocation, Navigate, MemoryRouter } from 'react-router';
import DashboardPage from '../pages/Dashboard'
import UsersPage from '../pages/Users'
import ProfilePage from '../pages/Profile'
import RegisterPage from '../auth/Register';
import LoginPage from '../auth/Login';
import { useAppSelector } from '../store/store';
import ActivityLogsPage from '../pages/ActivityLogs';

const ProtectedRoute = ({children, roles}: {children: ReactNode, roles: string[]}) => {
    const {user, role} = useAppSelector(state => state.auth)
    const location = useLocation()
    

    if(!user){
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    if(roles && !roles.includes(role!!)){
        return <Navigate to="/" replace />
    }

    return children

}

const AppRoutes = () => {
    const {user, isAuth, token} = useAppSelector(state => state.auth)
    return (
        
        <Routes>
            <Route index element={<ProtectedRoute roles={['admin', 'user']}><DashboardPage /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute roles={['admin', 'user']}><DashboardPage /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute roles={['admin']}><UsersPage /></ProtectedRoute>} />
            <Route path="/logs" element={<ProtectedRoute roles={['admin']}><ActivityLogsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute roles={['admin', 'user']}><ProfilePage /></ProtectedRoute>} />
            <Route path="/profile/:id/view" element={<ProtectedRoute roles={['admin']}><ProfilePage /></ProtectedRoute>} />
            <Route path="/profile/:id/edit" element={<ProtectedRoute roles={['admin']}><ProfilePage /></ProtectedRoute>} />
            <Route path="/login" element={isAuth || token ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/register" element={isAuth || token ? <Navigate to="/" /> : <RegisterPage />} />
        </Routes>
       
    )
}

export default AppRoutes

