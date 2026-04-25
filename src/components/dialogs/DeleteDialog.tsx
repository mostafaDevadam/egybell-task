import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Stellen Sie sicher, dass diese importiert sind
import { toast } from 'react-toastify';


type Props = {
  showDeleteModal: boolean
  setShowDeleteModal: (val: boolean) => void
  onConfirm: (val: any) => void
  onCancel: () => void
  item: any
}
// Angenommen, dies ist Teil Ihrer Komponente
function DeleteDialog({ showDeleteModal, setShowDeleteModal, onConfirm, onCancel, item }: Props) {
  const [itemToDelete, setItemToDelete] = useState<any | null>(item);
  
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

  console.log("item:", item)
  


  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div className="fixed inset-0  bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" >
            <h3 className="text-lg font-semibold mb-4"></h3>
            <p className="mb-4">Are you sure to Delete it?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => { onCancel(); setIsConfirmed(false) }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => { onConfirm(itemToDelete.id); setIsConfirmed(true) }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteDialog;
