import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
// Angenommen, dies ist Teil Ihrer Komponente
function DeleteDialog({ showDeleteModal, setShowDeleteModal, onConfirm, onCancel, item }) {
    const [itemToDelete, setItemToDelete] = useState(item);
    const [isConfirmed, setIsConfirmed] = useState(false);
    console.log("item:", item);
    useEffect(() => {
        if (isConfirmed) {
            //toast.success(' deleted successfully.');
        }
        return () => {
        };
    }, [itemToDelete, isConfirmed]);
    return (_jsx(_Fragment, { children: showDeleteModal && itemToDelete && (_jsx("div", { className: "fixed inset-0  bg-opacity-25 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-sm w-full", children: [_jsx("h3", { className: "text-lg font-semibold mb-4" }), _jsx("p", { className: "mb-4", children: "Are you sure to Delete it?" }), _jsxs("div", { className: "flex justify-end space-x-4", children: [_jsx("button", { className: "px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500", onClick: () => { onCancel(); setIsConfirmed(false); }, children: "Cancel" }), _jsx("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500", onClick: () => { onConfirm(itemToDelete.id); setIsConfirmed(true); }, children: "Delete" })] })] }) })) }));
}
export default DeleteDialog;
