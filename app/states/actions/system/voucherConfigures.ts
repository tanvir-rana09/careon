import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const voucherConfigures = createApi({
    reducerPath: "systemVoucherConfiguresApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/system",
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
    tagTypes: ["SystemVoucherConfigures", "SystemVoucherConfigure"],
    endpoints: (builder) => ({
        fetchVoucherConfigures: builder.query({
            query: (params) => `voucher-configures?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["SystemVoucherConfigures"],
        }),
        cashControls: builder.query({
            query: (params) => `cash-controls?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["SystemVoucherConfigures"],
        }),
        createVoucherConfigure: builder.mutation({
            query: (data) => ({
                url: "voucher-configures",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SystemVoucherConfigures"],
        }),
        fetchVoucherConfigure: builder.query({
            query: (id) => `voucher-configures/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["SystemVoucherConfigure"],
        }),
        updateVoucherConfigure: builder.mutation({
            query: (data) => ({
                url: `voucher-configures/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SystemVoucherConfigures"],
        }),
        deleteVoucherConfigure: builder.mutation({
            query: (id) => ({
                url: `voucher-configures/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SystemVoucherConfigures"],
        }),
    }),
});

export const {
    useFetchVoucherConfiguresQuery,
    useCashControlsQuery,
    useCreateVoucherConfigureMutation,
    useFetchVoucherConfigureQuery,
    useUpdateVoucherConfigureMutation,
    useDeleteVoucherConfigureMutation,
} = voucherConfigures;

export default voucherConfigures;
