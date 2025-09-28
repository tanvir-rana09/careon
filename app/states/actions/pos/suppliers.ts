import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const suppliers = createApi({
    reducerPath: "posSuppliersApi",
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
    tagTypes: ["PosSuppliers", "PosSupplier"],
    endpoints: (builder) => ({
        fetchSuppliers: builder.query({
            query: (params) => `suppliers?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosSuppliers"],
        }),
        createSupplier: builder.mutation({
            query: (data) => ({
                url: "suppliers",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSuppliers"],
        }),
        fetchSupplier: builder.query({
            query: (id) => `suppliers/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosSupplier"],
        }),
        updateSupplier: builder.mutation({
            query: (data) => ({
                url: `suppliers/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSuppliers"],
        }),
        deleteSupplier: builder.mutation({
            query: (id) => ({
                url: `suppliers/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSuppliers"],
        }),
    }),
});

export const {
    useFetchSuppliersQuery,
    useCreateSupplierMutation,
    useFetchSupplierQuery,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation,
} = suppliers;

export default suppliers;
