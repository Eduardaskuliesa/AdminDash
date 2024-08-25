"use client";
import {
  Product,
  Products,
  UpdateProductPayload,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/state/productApi";
import React, { useState } from "react";
import Header from "../(components)/Inventory/Header";
import DataGrid from "../(components)/ui/DataGrid/DataGrid";

const colums = [
  { field: "name", headerName: "Product Name", width: 100 },
  { field: "categoryId", headerName: "Category", width: 50 },
  { field: "price", headerName: "Price", width: 50 },
  { field: "inventory", headerName: "Inventory", width: 50 },
];

const Inventory = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data: products, isError, isLoading } = useGetProductsQuery();

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      setErrorMessage(null);
      setSuccessMessage("Deleted successfuly");
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
      <Header name="Inventory"></Header>
      {successMessage && (
        <div className="text-center text-green-500 py-2">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-center text-red-500 py-2">{errorMessage}</div>
      )}
      <DataGrid
        withCheckbox={true}
        columns={colums}
        onDelete={(id) => handleDelete(id)}
        onEdit={handleEdit}
        rows={products as any}
      ></DataGrid>
    </div>
  );
};

export default Inventory;
