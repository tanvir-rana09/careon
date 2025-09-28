import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";

const vouchersApi = createApi({
    reducerPath: "vouchersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/accounts", // Base URL up to /accounts
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token ?? Cookies.get("authToken") ?? null;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            headers.set("Accept", "application/json");
            return headers;
        },
    }),
    keepUnusedDataFor: 5,
    refetchOnReconnect: true,
    tagTypes: ["Vouchers", "Voucher"],
    endpoints: (builder) => ({
        fetchVouchers: builder.query({
            query: ({ type, params = "" }) => `${type}?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Vouchers"],
        }),

        createVoucher: builder.mutation({
            query: ({ type, data }) => {
                const isFormData = data instanceof FormData;

                return {
                    url: `${type}`,
                    method: "POST",
                    body: isFormData ? data : JSON.stringify(data),
                    headers: isFormData
                        ? undefined
                        : { "Content-Type": "application/json" },
                };
            },
        }),
        fetchVoucher: builder.query({
            query: ({ type, id }) => `${type}/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["Voucher"],
        }),

        updateVoucher: builder.mutation({
            query: ({ type, id, data }) => ({
                url: `${type}/${id}`,
                method: "PATCH",
                body: data,
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Vouchers", "Voucher"],
        }),

        deleteVoucher: builder.mutation({
            query: ({ type, id }) => ({
                url: `${type}/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Vouchers"],
        }),

        postVoucher: builder.mutation({
            query: ({ type, id }) => ({
                url: `${type}/${id}/post`,
                method: "POST",
            }),
            invalidatesTags: ["Vouchers", "Voucher"],
        }),

        cancelVoucher: builder.mutation({
            query: ({ type, id }) => ({
                url: `${type}/${id}/cancel`,
                method: "POST",
            }),
            invalidatesTags: ["Vouchers", "Voucher"],
        }),

        generatePdf: builder.mutation({
            query: ({ type, data }) => ({
                url: `${type}`,
                method: "POST",
                body: data,
                responseHandler: (response) => response.blob(),
            }),
            invalidatesTags: ["Vouchers"],
        }),
        
    }),
});

// Export hooks
export const {
    useFetchVouchersQuery,
    useCreateVoucherMutation,
    useFetchVoucherQuery,
    useUpdateVoucherMutation,
    useDeleteVoucherMutation,
    usePostVoucherMutation,
    useGeneratePdfMutation,
    useCancelVoucherMutation,
} = vouchersApi;

export default vouchersApi;
