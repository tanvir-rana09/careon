import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const chartOfAccounts = createApi({
    reducerPath: "accountChartOfAccountsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/accounts",
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
    tagTypes: ["AccountChartOfAccounts", "AccountChartOfAccount"],
    endpoints: (builder) => ({
        fetchChartOfAccounts: builder.query({
            query: (params) => `chart-of-accounts?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["AccountChartOfAccounts"],
        }),
        fetchChartOfAccountChilds: builder.query({
            query: (params) => `only-childs?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["AccountChartOfAccounts"],
        }),
        cashControlsBanks: builder.query({
            query: (params) => `cash?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["AccountChartOfAccounts"],
        }),
        createChartOfAccount: builder.mutation({
            query: (data) => ({
                url: "chart-of-accounts",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AccountChartOfAccounts"],
        }),
        fetchChartOfAccount: builder.query({
            query: (id) => `chart-of-accounts/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["AccountChartOfAccount"],
        }),
        updateChartOfAccount: builder.mutation({
            query: (data) => ({
                url: `chart-of-accounts/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AccountChartOfAccounts"],
        }),
        deleteChartOfAccount: builder.mutation({
            query: (id) => ({
                url: `chart-of-accounts/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AccountChartOfAccounts"],
        }),
        getNotes: builder.query({
            query: (type) => `notes?type=${type}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["AccountChartOfAccount"],
        })
    }),
});

export const {
    useFetchChartOfAccountsQuery,
    useFetchChartOfAccountChildsQuery,
    useCashControlsBanksQuery,
    useCreateChartOfAccountMutation,
    useFetchChartOfAccountQuery,
    useUpdateChartOfAccountMutation,
    useDeleteChartOfAccountMutation,
    useGetNotesQuery
} = chartOfAccounts;

export default chartOfAccounts;
