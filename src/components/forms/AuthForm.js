import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputPassword from "./inputs/InputPassword";
import InputEmail from "./inputs/InputEmail";
import Label from "./Label";
import { useNavigate } from "react-router";
const AuthForm = ({ action, buttonTitle, formTitle, isConfirm = false, isRole = true }) => {
    const [state, formAction] = useActionState(action, null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatched, setIsMatched] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
    }, []);
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
            const register = formTitle.toLowerCase();
            const login = formTitle.toLowerCase();
            if (register === "register" && (state?.message.includes("Registration") || state?.message.includes("registered"))) {
                toast.success("Registered successful");
                navigate("/login");
            }
            else if (login === "login" && state?.data?.access_token) {
                navigate("/");
            }
        }
        else if (state?.error) {
            toast.error(state.message);
        }
    }, [state]);
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setShowEmailError(value.length === 0 || !value.includes("@"));
    };
    const handleChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setShowPasswordError(value.length < 6 || value.length === 0);
    };
    const handleChangeConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setShowConfirmPasswordError(value.length > 0 && value !== password);
        setIsMatched(value.length > 0 && value !== password ? false : true);
    };
    useEffect(() => {
        setIsEmpty(password && !confirmPassword ? true : false);
    }, [isEmpty, password, confirmPassword]);
    return (_jsxs("div", { className: "w-full", id: "main", children: [_jsx("h1", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100", "data-testid": "form-title", children: formTitle }), _jsxs("form", { action: formAction, className: "flex flex-col gap-5 mx-auto", children: [isRole && _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "role", className: "block text-sm font-medium text-start", title: "Role" }), _jsxs("select", { name: "role", role: "role", defaultValue: "admin", className: `px-2 block w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm sm:text-base cursor-pointer`, children: [_jsx("option", { value: "user", children: "User" }), _jsx("option", { value: "admin", children: "Admin" })] })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "email", className: "block text-sm font-medium text-start", title: "Email" }), _jsx(InputEmail, { onChange: handleChangeEmail })] }), showEmailError && _jsx("div", { children: _jsx("p", { className: "text-red-500 px-2 py-1 rounded-lg", children: "Email is required and Enter your  email,please!" }) }), _jsxs("div", { className: "flex flex-col gap-1.5 sm:gap-2", children: [_jsx(Label, { htmlFor: "password", className: "text-sm sm:text-base font-medium text-gray-700 dark:text-gray-100 text-start", title: "Password" }), _jsx(InputPassword, { value: password, name: "password", onChange: handleChangePassword, minLength: 6 })] }), showPasswordError && _jsxs("div", { children: [_jsx("p", { className: "text-red-500 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-gray-100", children: "Password is required" }), _jsx("p", { className: "text-red-500 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-gray-100", children: "Password must be at least 6 characters long " })] }), isConfirm &&
                        (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col gap-1.5 sm:gap-2", children: [_jsx(Label, { htmlFor: "confirm", className: "text-sm sm:text-base font-medium text-gray-700 dark:text-gray-100 text-start", title: "confirm" }), _jsx(InputPassword, { value: confirmPassword, dataTestid: "confirm-password", name: "confirm", onChange: handleChangeConfirmPassword })] }), !isMatched && _jsx("div", { children: _jsx("p", { className: "text-red-500 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-gray-100", children: "Password is not matched" }) }), showConfirmPasswordError && _jsx("div", { children: _jsx("p", { className: "text-red-500 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-gray-100", children: "Confirm Password is required" }) })] })), _jsx("button", { type: "submit", role: "button", "data-testid": "submit-button", className: `bg-blue-600 text-white rounded-lg px-4 py-2 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800 
                     ${showError || showEmailError || showPasswordError || showConfirmPasswordError ? 'cursor-not-allowed' : ''} `, disabled: showEmailError || showPasswordError || showConfirmPasswordError, children: buttonTitle })] })] }));
};
export default AuthForm;
