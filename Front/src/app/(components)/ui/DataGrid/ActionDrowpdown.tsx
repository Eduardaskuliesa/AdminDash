import React, { ChangeEvent, useState } from "react";
import { MoreVertical, Edit, Trash2, XCircle, Edit3 } from "lucide-react";
import Modal from "../Modal";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDropdownToggled } from "@/state";

interface Product {
  id: string;
  name: string;
  categoryId: number;
  price: number;
  description: string;
  inventory: number;
}

interface ActionsDropdownProps<T extends Product> {
  row: T;
  rowId: string;
  onEdit: (updatedProduct: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

function ActionsDropdown<T extends Product>({
  row,
  rowId,
  onEdit,
  onDelete,
}: ActionsDropdownProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<"edit_form" | "confirm_delete" | "">(
    ""
  );
  const [formData, setFormData] = useState<Partial<Product>>({
    name: row.name,
    categoryId: row.categoryId,
    price: row.price,
    description: row.description,
    inventory: row.inventory,
  });

  const dispatch = useAppDispatch();
  const isDropdownToggled = useAppSelector(
    (state) => state.global.isDropdownToggled
  );

  const toggleDropdown = () => {
    dispatch(setIsDropdownToggled(isOpen ? null : rowId));
  };
  const isOpen = isDropdownToggled === rowId;

  const handleEditClick = () => {
    setIsModalOpen(true);
    setMessage("edit_form");
    dispatch(setIsDropdownToggled(null));
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
    setMessage("confirm_delete");
    dispatch(setIsDropdownToggled(null));
  };

  const handleConfirmDelete = () => {
    onDelete(rowId);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "inventory" || name === "categoryId"
          ? parseFloat(value)
          : value,
    }));
    console.log(formData);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(formData);
    setFormData({
      name: row.name,
      categoryId: row.categoryId,
      price: row.price,
      description: row.description,
      inventory: row.inventory,
    });
    closeModal();
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
            onClick={handleEditClick}
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

      <Modal open={isModalOpen} onClose={closeModal} className="">
        <div className="p-4">
          {message === "confirm_delete" && (
            <>
              <p className="mb-2 text-center font-semibold">
                Are you sure you want to delete this product?
              </p>
              <p className="mb-4 text-center text-sm ">
                This action cannot be undone. This product will be permanently
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
          {message === "edit_form" && (
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <h2 className="text-2xl font-bold text-center text-gray-700 mt-4">
                Edit {row.name}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6 p-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Name
                  </label>
                  <input
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    id="name"
                    name="name"
                    className="shadow-sm appearance-none border bg-gray-50 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    onChange={handleChange}
                    value={formData.price}
                    id="price"
                    name="price"
                    className="shadow-sm appearance-none bg-gray-50 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                    step="0.01"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={formData.description}
                    id="description"
                    name="description"
                    className="shadow-sm appearance-none border bg-gray-50 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                    rows={3}
                  />
                </div>
                <div>
                  <label
                    htmlFor="inventory"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Inventory
                  </label>
                  <input
                    value={formData.inventory}
                    onChange={handleChange}
                    type="number"
                    id="inventory"
                    name="inventory"
                    className="shadow-sm appearance-none border bg-gray-50 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label
                    htmlFor="categoryId"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Category ID
                  </label>
                  <input
                    value={formData.categoryId}
                    onChange={handleChange}
                    type="number"
                    id="categoryId"
                    name="categoryId"
                    className="shadow-sm appearance-none border bg-gray-50 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  />
                </div>
                <div className="flex justify-between pt-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Confirm Edit
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ActionsDropdown;
