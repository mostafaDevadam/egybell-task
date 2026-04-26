import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useActionState, useEffect } from 'react';
import Label from './Label';
import InputEmail from './inputs/InputEmail';
import { toast } from 'react-toastify';
import InputHidden from './inputs/InputHidden';
const ProfileForm = ({ buttonTitle, title, user, action }) => {
    const [state, formAction] = useActionState(action, null);
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
        }
        else if (state?.error) {
            toast.error(state.message);
        }
    }, [state]);
    return (_jsxs("div", { className: "w-full", children: [_jsx("h1", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100", children: title }), _jsxs("form", { action: formAction, className: "flex flex-col gap-5 mx-auto", children: [user && user.id && _jsx(InputHidden, { name: "userId", value: user.id }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "role", className: "block text-sm font-medium text-start", title: "Role" }), _jsxs("select", { name: "role", "data-testid": "role", defaultValue: user.role, required: true, className: `px-2 block w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm sm:text-base cursor-pointer`, children: [_jsx("option", { value: "user", children: "User" }), _jsx("option", { value: "admin", children: "Admin" })] })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "email", className: "block text-sm font-medium text-start", title: "Email" }), _jsx(InputEmail, { defaultValue: user.email || null })] }), _jsx("button", { type: "submit", "data-testid": "submit-button", className: "bg-blue-600 text-white rounded-lg px-4 py-2 \r\n                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 \r\n                     dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800", children: buttonTitle })] })] }));
};
export default ProfileForm;
