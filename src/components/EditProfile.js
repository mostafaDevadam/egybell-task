import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProfileForm from './forms/ProfileForm';
import { updateUserAction } from '../actions/user.actions';
const EditProfile = ({ user }) => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100", children: [_jsx("div", { className: "text-center pb-5" }), _jsx("div", { className: "w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700", children: user && _jsx(ProfileForm, { action: updateUserAction, buttonTitle: 'Update', title: "Edit Profile", user: user }) })] }));
};
export default EditProfile;
