import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useEffect, useState } from 'react';
import { getUsersAPI } from '../api/user.api';
import Spinner from '../components/Spinner';
import Table from '../components/data-tables/Table';
const UsersPage = () => {
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        const time = setTimeout(() => {
            getUsersAPI().then((th) => {
                // if (!mounted) return
                setIsLoading(false);
                console.log("users:", th);
                th.data && setUsers(th.data);
            }).catch((err) => {
                console.log("err:", err);
                // if (!mounted) return
                setIsError(true);
            }).finally(() => {
                //if (!mounted) return
                setIsLoading(false);
                setIsError(false);
            });
        }, 1000);
        return () => {
            clearTimeout(time);
            setIsLoading(false);
            mounted = false;
        };
    }, [users]);
    return (_jsxs("div", { children: [_jsx("p", { className: 'text-gray-500 text-2xl p-2 dark:text-gray-100', children: "Users List" }), _jsxs("div", { children: [!users && isLoading && _jsxs("div", { children: [_jsx(Spinner, { title: "Loading..." }), " "] }), _jsx(Suspense, { fallback: _jsx(Spinner, { title: "Loading..." }), children: users && _jsx(Table, { type: 'users', fields: ["id", "email", "role", "actions"], docs: users, isActions: true }) })] })] }));
};
export default UsersPage;
