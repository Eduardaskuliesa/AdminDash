import React, { useEffect, useState } from "react";
import { MoreVertical, Edit, Trash2, XCircle, CheckCircle } from "lucide-react";
import Modal from "../Modal";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDropdownToggled } from "@/state";

interface ActionsDropdownProps<T> {
  row: T;
  rowId: string;
  onEdit: (row: T) => void;
  onDelete: (id: string) => void;
}

function ActionsDropdown<T>({
  row,
  rowId,
  onEdit,
  onDelete,
}: ActionsDropdownProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const isDropdownToggled = useAppSelector(
    (state) => state.global.isDropdownToggled
  );

  const toggleDropdown = () => {
    dispatch(setIsDropdownToggled(isOpen ? null : rowId));
  };
  const isOpen = isDropdownToggled === rowId;

  const handleDeleteClick = () => {
    setIsModalOpen(true);
    setMessage("confirm_delete");
    dispatch(setIsDropdownToggled(null));
  };

  const handleConfirmDelete = async () => {
    onDelete(rowId);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  return (
    <div className="relative actions-dropdown">
      <button
        onClick={toggleDropdown}
        className="bg-gray-200 text-gray-700 font-semibold p-2 rounded inline-flex items-center"
      >
        <MoreVertical size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
          <button
            onClick={() => {
              onEdit(row);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Edit size={16} className="mr-2 text-blue-500" />
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Trash2 size={16} className="mr-2 text-red-500" />
            Delete
          </button>
        </div>
      )}

      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="p-4">
          {message === "confirm_delete" && (
            <>
              <p className="mb-2 text-center font-semibold">
                Are you sure you want to delete this product?
              </p>
              <p className="mb-4 text-center text-sm ">
                This action cannot be undone.This product will be permanently
                removed.
              </p>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Confirm Delete
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 flex items-center"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ActionsDropdown;
