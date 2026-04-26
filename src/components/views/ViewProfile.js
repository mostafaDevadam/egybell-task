import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import RenderActionButton from '../data-tables/RenderActionButton';
import { Role } from '../../enums';
import { Link } from 'react-router';
const ViewProfile = ({ user }) => {
    const { user: currentUser, role } = useAppSelector((state) => state.auth);
    const [state, setState] = useState();
    // if current role is admin then display delete
    // if current user id is same as user id as param then display delete and edit
    const bio = `
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti a ipsum esse voluptate dolorem quasi! Libero assumenda maiores reiciendis quod veniam? Vel, modi? Modi similique expedita quasi quo vero. Voluptate?`;
    useEffect(() => {
        if (user) {
            setState(user);
        }
    }, [state, user]);
    return (_jsxs("div", { children: [_jsx("p", { className: 'text-gray-500 text-2xl p-2', "data-testid": "title", children: "Profile" }), state &&
                _jsxs("div", { className: 'text-start px-4 flex flex-col gap-5', children: [_jsxs("div", { className: 'flex justify-end gap-5 ', children: [role === Role.ADMIN || currentUser?.id === state.id ? _jsx(RenderActionButton, { row: state, title: "Delete", className: "" }) : null, role === Role.USER || currentUser?.id === state.id ? _jsx(Link, { to: `/profile/${state.id}/edit`, "data-testid": "edit", className: "cursor-pointer text-green-700 border border-green-700 hover:border-0 hover:bg-green-500 hover:text-white px-3 py-1 rounded", children: "Edit" }) : null] }), _jsxs("p", { className: 'bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700', "data-testid": "email", children: ["Email: ", state.email] }), _jsxs("p", { className: 'bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10', "data-testid": "role", children: ["Role: ", state.role] }), _jsxs("div", { className: 'bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10', children: [_jsx("p", { "data-testid": "bio", children: "Bio" }), _jsx("p", { "data-testid": "bio-content", children: bio })] })] })] }));
};
export default ViewProfile;
