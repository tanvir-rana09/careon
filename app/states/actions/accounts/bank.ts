import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const banksApi = createApi({
    reducerPath: "banksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/accounts/banks",
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
    tagTypes: ["Banks", "Bank"],
    endpoints: (builder) => ({
        fetchBanks: builder.query({
            query: (params) => `?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Banks"],
        }),
        createBank: builder.mutation({
            query: (data) => ({
                url: "",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Banks"],
        }),
        fetchBank: builder.query({
            query: (id) => `${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["Bank"],
        }),
        updateBank: builder.mutation({
            query: (data) => ({
                url: `${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Banks"],
        }),
        deleteBank: builder.mutation({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Banks"],
        }),
    }),
});

export const {
    useFetchBanksQuery,
    useCreateBankMutation,
    useFetchBankQuery,
    useUpdateBankMutation,
    useDeleteBankMutation,
} = banksApi;

export default banksApi;
