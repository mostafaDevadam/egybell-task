import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router';
import { useAppSelector } from '../../store/store';
import RenderActionButton from './RenderActionButton';
function Table({ docs, fields, isActions, type }) {
    const { role, user } = useAppSelector(state => state.auth);
    const formatDate = (cellValue) => {
        if (!cellValue)
            return cellValue;
        return new Date(cellValue).toISOString().slice(0, 10);
    };
    return (_jsx("div", { className: "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg p-4", "data-testid": "container", children: _jsx("div", { className: "flex flex-col md:flex-row justify-between gap-4 pb-5 px-4 ", "data-testid": "header", children: _jsxs("table", { "data-testid": "table", className: "min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700 shadow-sm", children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: "5%" } }), _jsx("col", { style: { width: "50%", marginLeft: '50px' } }), _jsx("col", { style: { width: "20%" } }), _jsx("col", { style: { width: "15%" } })] }), _jsx("thead", { className: "bg-gray-50 dark:bg-gray-800", children: _jsx("tr", { children: fields && fields.map((f, index) => (_jsx("th", { className: "px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300", children: f }, index))) }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700", children: docs && docs.map((m, index) => (type === "users" && m.id !== user?.id ?
                            _jsx("tr", { className: "text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-300 hover:text-gray-700", children: fields && fields.map((f, index) => (_jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: f === "id" ? m[f] : f === "email" ? m[f] : f === "action" ? m[f] : f === "user" ? m[f].email
                                        : f === "role" ? m[f] : f === "timestamp" ? formatDate(m[f])
                                            : isActions && role === 'admin' ? (_jsxs("div", { className: "flex flex-col md:flex-row gap-2", children: [_jsx(Link, { to: `/profile/${m.id}/view`, "data-testid": "view", className: "cursor-pointer text-blue-700 border border-blue-700 hover:border-0 hover:bg-blue-500 hover:text-white px-3 py-1 rounded", children: "View" }), _jsx(Link, { to: `/profile/${m.id}/edit`, "data-testid": "edit", className: "cursor-pointer text-green-700 border border-green-700 hover:border-0 hover:bg-green-500 hover:text-white px-3 py-1 rounded", children: "Edit" }), user?.id !== m.id &&
                                                        _jsx(RenderActionButton, { row: m, title: "Delete", className: "" })] })) : m[f] }, index))) }, index) : type === "logs" &&
                            _jsx("tr", { className: "text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-300 hover:text-gray-700", children: fields && fields.map((f, index) => (_jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: f === "id" ? m[f] : f === "email" ? m[f] : f === "action" ? m[f] : f === "user" ? m[f].email
                                        : f === "role" ? m[f] : f === "timestamp" ? formatDate(m[f])
                                            : m[f] }, index))) }, index))) })] }) }) }));
}
export default Table;
