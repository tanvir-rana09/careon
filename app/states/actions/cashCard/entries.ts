import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const cashCardEntries = createApi({
    reducerPath: "cashCardEntriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/cash-card",
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
    tagTypes: ["cashCardEntries", "cashCardEntry"],
    endpoints: (builder) => ({
        fetchCashCardEntries: builder.query({
            query: (params) => `cash-card-rfid?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["cashCardEntries"],
        }),
        createCashCardEntry: builder.mutation({
            query: (data) => ({
                url: "cash-card-rfid",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardEntries"],
        }),
        fetchCashCardEntry: builder.query({
            query: (id) => `cash-card-rfid/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["cashCardEntry"],
        }),
        updateCashCardEntry: builder.mutation({
            query: (data) => ({
                url: `cash-card-rfid/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardEntries"],
        }),
        deleteCashCardEntry: builder.mutation({
            query: (id) => ({
                url: `cash-card-rfid/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardEntries"],
        }),
    }),
});

export const {
    useFetchCashCardEntriesQuery,
    useCreateCashCardEntryMutation,
    useFetchCashCardEntryQuery,
    useUpdateCashCardEntryMutation,
    useDeleteCashCardEntryMutation,
} = cashCardEntries;

export default cashCardEntries;
