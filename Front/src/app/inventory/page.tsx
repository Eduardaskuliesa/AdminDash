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
  { field: "id", headerName: "Id", width: 50 },
  { field: "name", headerName: "Product Name", width: 100 },
  { field: "categoryId", headerName: "Category", width: 50 },
  { field: "price", headerName: "Price", width: 50 },
  { field: "inventory", headerName: "Inventory", width: 50 },
];

const Inventory = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: products, isError, isLoading } = useGetProductsQuery();

  const [updateProduct, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateProductMutation();

  const [deleteProduct, { isLoading: isDeleting, isError: isDeleteError }] =
    useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProduct(id).unwrap();
      console.log("Delete response:", response);
      setErrorMessage(null);
      console.log("Product deleted successfully");
    } catch (error) {
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
      <DataGrid
        withCheckbox={true}
        columns={colums}
        onDelete={(id) => handleDelete(id)}
        onEdit={handleEdit}
        pageSize={20}
        rows={products as any}
      ></DataGrid>
    </div>
  );
};

export default Inventory;
