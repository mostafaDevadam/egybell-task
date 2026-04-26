import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppSelector } from '../store/store';
const DashboardPage = () => {
    const { user, role } = useAppSelector((state) => state.auth);
    console.log({ user, role });
    const lorem = `
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est exercitationem illo architecto blanditiis culpa quod neque assumenda sapiente nemo, tempora, incidunt et saepe aperiam accusantium rerum! Reprehenderit eaque aperiam sapiente!
  
  `;
    return (_jsxs("div", { children: [_jsx("p", { className: 'text-gray-500 text-2xl p-2 dark:text-gray-100', children: "Dashboard" }), _jsxs("div", { className: 'text-start px-4 flex flex-col gap-5', children: [_jsxs("p", { className: 'bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700', children: ["Email: ", user.email] }), _jsxs("p", { className: 'bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sm:mt-10', children: ["Role: ", role] })] }), [1, 2, 3, 4].map((m, i) => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-5 px-4 mt-5", children: [_jsx("div", { className: "test-content w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600 dark:hover:border-gray-100", children: lorem }), _jsx("div", { className: "test-content w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2 col-span-1 hover:border-blue-600 dark:hover:border-gray-100", children: lorem })] }, i)))] }));
};
export default DashboardPage;
