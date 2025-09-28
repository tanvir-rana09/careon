/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

export const productGroupApi = createApi({
  reducerPath: "productGroupApi",
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
  tagTypes: ["ProductGroup", "ProductGroups"],
  endpoints: (builder) => ({
    fetchProductGroups: builder.query({
      query: (params) => `product-groups?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["ProductGroups"],
    }),
    createProductGroup: builder.mutation({
      query: (data) => ({
        url: "product-groups",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["ProductGroups"],
    }),
    fetchProductGroup: builder.query({
      query: (id) => `product-groups/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["ProductGroup"],
    }),
    updateProductGroup: builder.mutation({
      query: (data) => ({
        url: `product-groups/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["ProductGroups"],
    }),
    deleteProductGroup: builder.mutation({
      query: (id) => ({
        url: `product-groups/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["ProductGroups"],
    }),
  }),
});

export const {
  useFetchProductGroupsQuery,
  useFetchProductGroupQuery,
  useCreateProductGroupMutation,
  useUpdateProductGroupMutation,
  useDeleteProductGroupMutation,
} = productGroupApi;
