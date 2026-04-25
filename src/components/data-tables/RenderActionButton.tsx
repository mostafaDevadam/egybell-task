"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import DeleteDialog from "../dialogs/DeleteDialog";


const RenderActionButton: React.FC<{ row: any; title: string, className?: string }> = ({ row, title, className }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = (id: any) => {
    
    if (!id) {
      toast.error("no item selected")
      return
    }
    console.log('delete id:', id);
    // Fügen Sie hier Ihre tatsächliche Löschlogik hinzu (z.B. API-Aufruf)
    // Nach dem Löschen: Modal schließen und State zurücksetzen
    toast.success(' deleted successfully.');


    setShowDeleteModal(false);

    // Optional: Aktualisieren Sie die Liste der Kinder nach dem Löschen
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };


  return (<>
    <button 
      onClick={() => { console.log(`clicked: ${title}, id: ${row.id}`); setShowDeleteModal(true); }}
     className={`px-2 py-2 rounded-lg
    bg-red-500 text-white
    lg:bg-transparent lg:text-red-600 lg:hover:bg-red-500 lg:hover:text-white
    dark:lg:text-gray-300 dark:lg:hover:bg-gray-100 dark:lg:hover:text-red-500
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900`}
>
      {title}
    </button>

    {showDeleteModal && <DeleteDialog
      item={row}
      showDeleteModal={showDeleteModal}
      setShowDeleteModal={setShowDeleteModal}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete} />}

  </>)
}




export default RenderActionButton
