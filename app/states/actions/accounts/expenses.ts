import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const expenses = createApi({
    reducerPath: "accountExpensesApi",
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
    tagTypes: ["AccountExpenses", "AccountExpense"],
    endpoints: (builder) => ({
        fetchExpenses: builder.query({
            query: (params) => `expenses?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["AccountExpenses"],
        }),
        createExpense: builder.mutation({
            query: (data) => ({
                url: "expenses",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AccountExpenses"],
        }),
        fetchExpense: builder.query({
            query: (id) => `expenses/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["AccountExpense"],
        }),
        updateExpense: builder.mutation({
            query: (data) => ({
                url: `expenses/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AccountExpenses"],
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `expenses/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AccountExpenses"],
        }),
    }),
});

export const {
    useFetchExpensesQuery,
    useCreateExpenseMutation,
    useFetchExpenseQuery,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
} = expenses;

export default expenses;
