/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const purchaseRequisition = createApi({
  reducerPath: "purchaseRequisitionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/inventory",
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
  tagTypes: ["purchaseRequisition", "purchaseRequisitionList"],
  endpoints: (builder) => ({
    fetchPurchaseRequisitions: builder.query({
      query: (params) => `/purchase-requisition?${params || ""}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["purchaseRequisitionList"],
    }),
    fetchPurchaseRequisitionSearch: builder.query({
      query: (params) => `purchase-requisition/search?${params || ""}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["purchaseRequisition"],
    }),
    createPurchaseRequisition: builder.mutation({
      query: (data) => ({
        url: "purchase-requisition",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["purchaseRequisitionList"],
    }),
    fetchPurchaseRequisition: builder.query({
      query: (id) => `purchase-requisition/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["purchaseRequisition"],
    }),
    updatePurchaseRequisition: builder.mutation({
      query: (data) => ({
        url: `purchase-requisition/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["purchaseRequisitionList"],
    }),
    deletePurchaseRequisition: builder.mutation({
      query: (id) => ({
        url: `purchase-requisition/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["purchaseRequisitionList"],
    }),
    updateStatusPurchaseRequisition: builder.mutation({
      query: (data) => ({
        url: `purchase-requisition/approval/status`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["purchaseRequisitionList"],
    }),
  }),
});

export const {
  useFetchPurchaseRequisitionsQuery,
  useFetchPurchaseRequisitionSearchQuery,
  useFetchPurchaseRequisitionQuery,
  useCreatePurchaseRequisitionMutation,
  useUpdatePurchaseRequisitionMutation,
  useDeletePurchaseRequisitionMutation,
  useUpdateStatusPurchaseRequisitionMutation,
} = purchaseRequisition;

export default purchaseRequisition;
