import React from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
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
  const dispatch = useAppDispatch();
  const isDropdownToggled = useAppSelector(
    (state) => state.global.isDropdownToggled
  );

  const isOpen = isDropdownToggled === rowId;

  const toggleDropdown = () => {
    dispatch(setIsDropdownToggled(isOpen ? null : rowId));
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
              dispatch(setIsDropdownToggled(null));
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Edit size={16} className="mr-2" />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(rowId);
              dispatch(setIsDropdownToggled(null));
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionsDropdown;
