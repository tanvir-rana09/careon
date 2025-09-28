import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

export const replacementLeaveEntryApi = createApi({
    reducerPath: "replacementLeaveEntryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/attendance",
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
    tagTypes: ["ReplacementLeaveEntries", "ReplacementLeaveEntry"],
    endpoints: (builder) => ({
        fetchReplacementLeaveEntries: builder.query({
            query: (params) => `replacement-entries?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["ReplacementLeaveEntries"],
        }),
        fetchReplacementLeaveEntry: builder.query({
            query: (id) => `replacement-entries/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["ReplacementLeaveEntry"],
        }),
        createReplacementLeaveEntry: builder.mutation({
            query: (data) => ({
                url: "replacement-entries",
                method: "POST",
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["ReplacementLeaveEntries"],
        }),
        updateReplacementLeaveEntry: builder.mutation({
            query: (data) => ({
                url: `replacement-entries/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["ReplacementLeaveEntries", "ReplacementLeaveEntry"],
        }),
        deleteReplacementLeaveEntry: builder.mutation({
            query: (id) => ({
                url: `replacement-entries/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ReplacementLeaveEntries"],
        }),
    }),
});

export const {
    useFetchReplacementLeaveEntriesQuery,
    useFetchReplacementLeaveEntryQuery,
    useCreateReplacementLeaveEntryMutation,
    useUpdateReplacementLeaveEntryMutation,
    useDeleteReplacementLeaveEntryMutation,
} = replacementLeaveEntryApi;