import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Spinner = ({ title }) => {
    return (_jsxs("div", { id: "container-spinner", "data-testid": "container-spinner", className: "flex flex-col items-center justify-center py-6", role: "spinner", "aria-live": "polite", children: [_jsx("div", { id: "sub-spinner", "data-testid": "sub-spinner", className: "w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" }), _jsx("span", { id: "title-spinner", "data-testid": "title-spinner", className: "mt-2 text-sm text-gray-600", children: title })] }));
};
export default Spinner;
