import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberPayments = createApi({
    reducerPath: "crmMemberPaymentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/crm",
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
    tagTypes: ["CrmMemberPayments", "CrmMemberPayment"],
    endpoints: (builder) => ({
        fetchMemberPayments: builder.query({
            query: (params) => `member-payments?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberPayments"],
        }),
        createMemberPayment: builder.mutation({
            query: (data) => ({
                url: "member-payments",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberPayments"],
        }),
        fetchMemberPayment: builder.query({
            query: (id) => `member-payments/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMemberPayment"],
        }),
        updateMemberPayment: builder.mutation({
            query: (data) => ({
                url: `member-payments/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberPayments"],
        }),
        deleteMemberPayment: builder.mutation({
            query: (id) => ({
                url: `member-payments/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberPayments"],
        }),
    }),
});

export const {
    useFetchMemberPaymentsQuery,
    useCreateMemberPaymentMutation,
    useFetchMemberPaymentQuery,
    useUpdateMemberPaymentMutation,
    useDeleteMemberPaymentMutation,
} = memberPayments;

export default memberPayments;
