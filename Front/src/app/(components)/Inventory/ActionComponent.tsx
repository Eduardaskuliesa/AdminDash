import React, { useState } from "react";
import { Trash2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Modal from "../ui/Modal";
import { setIsDropdownToggled } from "@/state";

interface ActionComponentProps {
  selectedRows: string[];
  onDeleteSelected: (selectedIds: string[]) => Promise<void>;
  onSelectionChange: (selectedIds: string[]) => void;
}

const ActionComponent: React.FC<ActionComponentProps> = ({
  selectedRows,
  onDeleteSelected,
  onSelectionChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [message, setMessage] = useState("");

  const handleDeleteSelected = () => {
    setIsModalOpen(true);
    setMessage("confirm_delete");
  };

  const confirmDelete = async () => {
    try {
      await onDeleteSelected(selectedRows);
      setIsModalOpen(false);
      onSelectionChange([]);
    } catch (error) {}
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2 ml-5">
        <button
          className="flex items-center"
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
          Delete Selected ({selectedRows.length})
        </button>
      </div>

      <Modal open={isModalOpen} onClose={closeModal} className="p-6 max-w-sm">
        <div className="flex flex-col items-center">
          {message === "confirm_delete" && (
            <>
              <p className="mb-2 text-center font-semibold">
                Are you sure you want to delete the selected items?
              </p>
              <p className="mb-4 text-center text-sm ">
                This action cannot be undone. All selected items will be
                permanently removed.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                  onClick={confirmDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Confirm Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 flex items-center"
                  onClick={closeModal}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ActionComponent;
