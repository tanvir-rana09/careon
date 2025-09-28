import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const supplierContacts = createApi({
    reducerPath: "posSupplierContactsApi",
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
    tagTypes: ["PosSupplierContacts", "PosSupplierContact"],
    endpoints: (builder) => ({
        fetchSupplierContacts: builder.query({
            query: (params) => `supplier-contacts?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosSupplierContacts"],
        }),
        createSupplierContact: builder.mutation({
            query: (data) => ({
                url: "supplier-contacts",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSupplierContacts"],
        }),
        fetchSupplierContact: builder.query({
            query: (id) => `supplier-contacts/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosSupplierContact"],
        }),
        updateSupplierContact: builder.mutation({
            query: (data) => ({
                url: `supplier-contacts/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSupplierContacts"],
        }),
        deleteSupplierContact: builder.mutation({
            query: (id) => ({
                url: `supplier-contacts/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSupplierContacts"],
        }),
    }),
});

export const {
    useFetchSupplierContactsQuery,
    useCreateSupplierContactMutation,
    useFetchSupplierContactQuery,
    useUpdateSupplierContactMutation,
    useDeleteSupplierContactMutation,
} = supplierContacts;

export default supplierContacts;
