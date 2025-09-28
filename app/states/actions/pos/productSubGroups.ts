/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

export const productSubGroupApi = createApi({
  reducerPath: "productSubGroupApi",
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
  tagTypes: ["ProductSubGroup", "ProductSubGroups"],
  endpoints: (builder) => ({
    fetchProductSubGroups: builder.query({
      query: (params) => `product-sub-groups?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["ProductSubGroups"],
    }),
    createProductSubGroup: builder.mutation({
      query: (data) => ({
        url: "product-sub-groups",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["ProductSubGroups"],
    }),
    fetchProductSubGroup: builder.query({
      query: (id) => `product-sub-groups/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["ProductSubGroup"],
    }),
    updateProductSubGroup: builder.mutation({
      query: (data) => ({
        url: `product-sub-groups/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["ProductSubGroups"],
    }),
    deleteProductSubGroup: builder.mutation({
      query: (id) => ({
        url: `product-sub-groups/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["ProductSubGroups"],
    }),
  }),
});

export const {
  useFetchProductSubGroupsQuery,
  useFetchProductSubGroupQuery,
  useCreateProductSubGroupMutation,
  useUpdateProductSubGroupMutation,
  useDeleteProductSubGroupMutation,
} = productSubGroupApi;
