/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const categories = createApi({
  reducerPath: "posCategoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/manage-products",
    headers: jsonHeaders,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token ?? Cookies.get("authToken") ?? null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 5,
  refetchOnReconnect: true,
  tagTypes: ["PosCategories", "PosCategory"],
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: (params) => `categories?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["PosCategories"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["PosCategories"],
    }),
    fetchCategory: builder.query({
      query: (id) => `categories/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["PosCategory"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `categories/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["PosCategories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["PosCategories"],
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categories;

export default categories;
