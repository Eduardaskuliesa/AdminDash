"use client";
import {
  Product,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/state/productApi";
import React, { useState } from "react";
import Header from "../(components)/Inventory/Header";
import DataGrid from "../(components)/ui/DataGrid/DataGrid";
import ActionComponent from "../(components)/Inventory/ActionComponent";
import { addToast } from "@/state/toastSlice";
import { useAppDispatch } from "../redux";
import { Column } from "../(components)/ui/DataGrid/types";

const colums: Column<Product>[] = [
  { field: "id", headerName: "Id", width: 50 },
  { field: "name", headerName: "Product Name", width: 100 },
  { field: "categoryId", headerName: "Category", width: 50 },
  { field: "price", headerName: "Price", width: 50 },
  { field: "inventory", headerName: "Inventory", width: 50 },
];

const Inventory = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const handleSelectionChange = (selectedIds: (string | number)[]) => {
    setSelectedRowIds(selectedIds as any);
  };

  const { data: products, isError, isLoading } = useGetProductsQuery();

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      dispatch(
        addToast({
          message: `Successfuly deleted product`,
          type: "success",
        })
      );
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      setSuccessMessage(null);
      dispatch(
        addToast({
          message: `Unable to delete product`,
          type: "error",
        })
      );
      console.error("Delete error:", error);
    }
  };

  const handleEdit = async (
    id: string,
    updatedData: Partial<Omit<Product, "id">>
  ) => {
    try {
      await updateProduct({ id, data: updatedData }).unwrap();
      dispatch(
        addToast({
          message: `Successfully updated product`,
          type: "success",
        })
      );
    } catch (error) {
      console.error("Update error:", error);
      dispatch(
        addToast({
          message: `Failed to update product`,
          type: "error",
        })
      );
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedRowIds.map((id) => deleteProduct(id).unwrap()));
      setErrorMessage(null);
      dispatch(
        addToast({
          message: `Successfuly deleted selected ${selectedRowIds.length} product(s)`,
          type: "success",
        })
      );
      setSelectedRowIds([]);
    } catch (error) {
      dispatch(
        addToast({
          message: `Unable to delete selected product(s)`,
          type: "error",
        })
      );
      console.error("Bulk delete error:", error);
    }
  };
  if (isLoading) {
    return <div className="py-4">Loading</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Header name="Inventory"></Header>
        <ActionComponent
          onSelectionChange={handleSelectionChange}
          selectedRows={selectedRowIds}
          onDeleteSelected={handleDeleteSelected}
        ></ActionComponent>
        <div className="flex justify-items-center pl-5">
          {successMessage && (
            <div className="text-center text-green-500 py-2 justify-items-center">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-center text-red-500 py-2">{errorMessage}</div>
          )}
        </div>
      </div>

      <DataGrid<Product>
        withCheckbox={true}
        columns={colums}
        onDelete={(id) => handleDelete(id as string)}
        onEdit={handleEdit}
        rows={products as any}
        onSelectionChange={handleSelectionChange}
      ></DataGrid>
    </div>
  );
};

export default Inventory;
