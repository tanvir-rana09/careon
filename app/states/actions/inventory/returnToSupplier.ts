// ~/states/actions/inventory/returnToSupplier.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

export const returnToSupplierApi = createApi({
    reducerPath: "returnToSupplierApi",
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
    tagTypes: ["ReturnToSuppliers", "ReturnToSupplier"],
    endpoints: (builder) => ({
        fetchReturnToSuppliers: builder.query({
            query: (params) => `return-to-suppliers?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["ReturnToSuppliers"],
        }),
        fetchReturnToSupplier: builder.query({
            query: (id) => `return-to-suppliers/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["ReturnToSupplier"],
        }),
        createReturnToSupplier: builder.mutation({
            query: (data) => ({
                url: "return-to-suppliers",
                method: "POST",
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["ReturnToSuppliers"],
        }),
        updateReturnToSupplier: builder.mutation({
            query: (data) => ({
                url: `return-to-suppliers/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["ReturnToSuppliers", "ReturnToSupplier"],
        }),
        deleteReturnToSupplier: builder.mutation({
            query: (id) => ({
                url: `return-to-suppliers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ReturnToSuppliers"],
        }),
        fetchChallanDetails: builder.query({
            query: (challanNo) => `central-store/challan/${challanNo}`,
            transformResponse: (response: { data: any }) => response?.data,
        }),
    }),
});

export const {
    useFetchReturnToSuppliersQuery,
    useFetchReturnToSupplierQuery,
    useCreateReturnToSupplierMutation,
    useUpdateReturnToSupplierMutation,
    useDeleteReturnToSupplierMutation,
    useFetchChallanDetailsQuery,
    useLazyFetchChallanDetailsQuery,
} = returnToSupplierApi;