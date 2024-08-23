import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000'}),
  reducerPath: "authApi",
  tagTypes: ["Register", "Login"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Register"],
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Login"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
