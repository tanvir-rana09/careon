import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const supplierTypes = createApi({
    reducerPath: "posSupplierTypesApi",
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
    tagTypes: ["PosSupplierTypes", "PosSupplierType"],
    endpoints: (builder) => ({
        fetchSupplierTypes: builder.query({
            query: (params) => `supplier-types?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosSupplierTypes"],
        }),
        createSupplierType: builder.mutation({
            query: (data) => ({
                url: "supplier-types",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSupplierTypes"],
        }),
        fetchSupplierType: builder.query({
            query: (id) => `supplier-types/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosSupplierType"],
        }),
        updateSupplierType: builder.mutation({
            query: (data) => ({
                url: `supplier-types/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSupplierTypes"],
        }),
        deleteSupplierType: builder.mutation({
            query: (id) => ({
                url: `supplier-types/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSupplierTypes"],
        }),
    }),
});

export const {
    useFetchSupplierTypesQuery,
    useCreateSupplierTypeMutation,
    useFetchSupplierTypeQuery,
    useUpdateSupplierTypeMutation,
    useDeleteSupplierTypeMutation,
} = supplierTypes;

export default supplierTypes;
