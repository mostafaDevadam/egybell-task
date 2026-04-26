import { jsx as _jsx } from "react/jsx-runtime";
import { logoutAction } from "../../actions/auth.actions";
const LogoutButton = ({ title, isMobile }) => {
    const handleLogout = async () => {
        await logoutAction();
    };
    return (_jsx("button", { "data-testid": "logout-button", onClick: handleLogout, className: `
        ${isMobile ? 'block w-full px-3 py-2 rounded-md text-base font-medium' : 'px-5 py-2 text-sm font-medium'}
        text-red-600 hover:bg-red-50 rounded-lg transition-colors
        dark:text-gray-100 dark:hover:text-red-500 dark:hover:bg-gray-100
      `, children: title }));
};
export default LogoutButton;
