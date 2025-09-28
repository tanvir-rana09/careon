/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const purchaseOrder = createApi({
    reducerPath: "purchaseOrderApi",
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
    tagTypes: ["purchaseOrder", "purchaseOrderList"],
    endpoints: (builder) => ({
        fetchPurchaseOrders: builder.query({
            query: (params) => `/purchase-order?${params || ""}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["purchaseOrderList"],
        }),
        fetchPurchaseOrderSearch: builder.query({
            query: (params) => `/purchase-order/search?${params || ""}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["purchaseOrder"],
        }),
        createPurchaseOrder: builder.mutation({
            query: (data) => ({
                url: "purchase-order",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["purchaseOrderList"],
        }),
        fetchPurchaseOrder: builder.query({
            query: (id) => `purchase-order/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["purchaseOrder"],
        }),
        updatePurchaseOrder: builder.mutation({
            query: (data) => ({
                url: `purchase-order/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["purchaseOrderList"],
        }),
        deletePurchaseOrder: builder.mutation({
            query: (id) => ({
                url: `purchase-order/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["purchaseOrderList"],
        }),
        updateStatusOrder: builder.mutation({
            query: (data) => ({
                url: `purchase-order/approval/status`,
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["purchaseOrderList"],
        }),
    }),
});

export const {
    useFetchPurchaseOrdersQuery,
    useFetchPurchaseOrderQuery,
    useFetchPurchaseOrderSearchQuery,
    useCreatePurchaseOrderMutation,
    useUpdatePurchaseOrderMutation,
    useDeletePurchaseOrderMutation,
    useUpdateStatusOrderMutation,
} = purchaseOrder;

export default purchaseOrder;
