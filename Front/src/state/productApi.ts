import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  inventory: number;
}

export interface NewProduct {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  inventory: number;
}

export interface Products {
  products: Product[];
}

export interface UpdateProductPayload {
  id: string;
  data: Partial<Omit<Product, "id">>;
}

export const productApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  reducerPath: "productApi",

  tagTypes: [
    "getProducts",
    "getProduct",
    "createProduct",
    "updateProduct",
    "deleteProduct",
  ],
  endpoints: (build) => ({
    getProducts: build.query<Products, void>({
      query: () => "/products",
      providesTags: ["getProducts"],
    }),
    getProduct: build.query<Product, string>({
      query: (id) => `/product/${id}`,
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getProducts"],
    }),
    updateProduct: build.mutation<Product, UpdateProductPayload>({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "getProduct", id },
        "getProducts",
      ],
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "getProduct", id },
        "getProducts",
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
