"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteDialog from "../dialogs/DeleteDialog";
import { deleteUserAction } from "../../actions/user.actions";
import { useAppSelector } from "../../store/store";
import { useNavigate } from "react-router";
import { logoutAction } from "../../actions/auth.actions";
const RenderActionButton = ({ row, title, className }) => {
    const { user: currentUser, role } = useAppSelector((state) => state.auth);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    const handleConfirmDelete = (id) => {
        if (!id) {
            toast.error("no item selected");
            return;
        }
        console.log('delete id:', id);
        // Fügen Sie hier Ihre tatsächliche Löschlogik hinzu (z.B. API-Aufruf)
        // Nach dem Löschen: Modal schließen und State zurücksetzen
        toast.success(' deleted successfully.');
        deleteUserAction(id).then((response) => {
            if (response?.success) {
                toast.success(response.message);
                if (currentUser?.id === id || response?.data.id === id) {
                    window.location.reload();
                    logoutAction();
                }
            }
            else {
                toast.error(response.message);
            }
        });
        setShowDeleteModal(false);
        // Optional: Aktualisieren Sie die Liste der Kinder nach dem Löschen
    };
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => { console.log(`clicked: ${title}, id: ${row.id}`); setShowDeleteModal(true); }, className: `px-2 py-2 rounded-lg
    bg-red-500 text-white border hover:border-0
    lg:bg-transparent lg:text-red-600 lg:hover:bg-red-500 lg:hover:text-white
    dark:lg:text-gray-300 dark:lg:hover:bg-gray-100 dark:lg:hover:text-red-500
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900`, children: title }), showDeleteModal && _jsx(DeleteDialog, { item: row, showDeleteModal: showDeleteModal, setShowDeleteModal: setShowDeleteModal, onConfirm: handleConfirmDelete, onCancel: handleCancelDelete })] }));
};
export default RenderActionButton;
