"use client";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/state/productApi";
import React, { useEffect, useState } from "react";
import Header from "../(components)/Inventory/Header";
import DataGrid from "../(components)/ui/DataGrid/DataGrid";
import ActionComponent from "./ActionComponent";

const colums = [
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

  useEffect(() => {
    console.log("Selected Rows ids:", selectedRowIds);
  }, [selectedRowIds]);

  const handleSelectionChange = (selectedIds: (string | number)[]) => {
    console.log("Selection changed in Inventory. New selection:", selectedIds);
    setSelectedRowIds(selectedIds as any);
  };

  const { data: products, isError, isLoading } = useGetProductsQuery();

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      setErrorMessage(null);
      setSuccessMessage("Deleted successfuly");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage("Delete failed");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = async ({ id, data }: any) => {
    try {
      await updateProduct({ id, data }).unwrap();
    } catch (error) {
      setErrorMessage("Failed to update product");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedRowIds.map((id) => deleteProduct(id).unwrap()));
      setErrorMessage(null);
      setSuccessMessage(
        `Deleted ${selectedRowIds.length} products successfully`
      );
      setSelectedRowIds([]);
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage("Failed to delete selected products");
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
        <div className="flex justify-items-center pl-20">
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

      <DataGrid
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
