/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const internalRequisition = createApi({
  reducerPath: "internalRequisitionApi",
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
  tagTypes: ["internalRequisition", "internalRequisitionList"],
  endpoints: (builder) => ({
    fetchInternalRequisitions: builder.query({
      query: (params) => `/internal-requisition?${params || ""}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["internalRequisitionList"],
    }),
    createInternalRequisition: builder.mutation({
      query: (data) => ({
        url: "internal-requisition",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["internalRequisitionList"],
    }),
    fetchInternalRequisition: builder.query({
      query: (id) => `internal-requisition/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["internalRequisition"],
    }),
    updateInternalRequisition: builder.mutation({
      query: (data) => ({
        url: `internal-requisition/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["internalRequisitionList"],
    }),
    deleteInternalRequisition: builder.mutation({
      query: (id) => ({
        url: `internal-requisition/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["internalRequisitionList"],
    }),
    updateStatusInternalRequisition: builder.mutation({
      query: (data) => ({
        url: `internal-requisition/approval/status`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["internalRequisitionList"],
    }),
  }),
});

export const {
  useFetchInternalRequisitionsQuery,
  useUpdateStatusInternalRequisitionMutation,
  useFetchInternalRequisitionQuery,
  useCreateInternalRequisitionMutation,
  useUpdateInternalRequisitionMutation,
  useDeleteInternalRequisitionMutation,
} = internalRequisition;

export default internalRequisition;
