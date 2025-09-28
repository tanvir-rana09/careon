import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

export const openingLeaveEntryApi = createApi({
    reducerPath: "openingLeaveEntryApi",
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
    tagTypes: ["OpeningLeaveEntries", "OpeningLeaveEntry"],
    endpoints: (builder) => ({
        fetchOpeningLeaveEntries: builder.query({
            query: (params) => `opening-entries?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["OpeningLeaveEntries"],
        }),
        fetchOpeningLeaveEntry: builder.query({
            query: (id) => `opening-entries/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["OpeningLeaveEntry"],
        }),
        createOpeningLeaveEntry: builder.mutation({
            query: (data) => ({
                url: "opening-entries",
                method: "POST",
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["OpeningLeaveEntries"],
        }),
        updateOpeningLeaveEntry: builder.mutation({
            query: (data) => ({
                url: `opening-entries/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["OpeningLeaveEntries", "OpeningLeaveEntry"],
        }),
        deleteOpeningLeaveEntry: builder.mutation({
            query: (id) => ({
                url: `opening-entries/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["OpeningLeaveEntries"],
        }),
    }),
});

export const {
    useFetchOpeningLeaveEntriesQuery,
    useFetchOpeningLeaveEntryQuery,
    useCreateOpeningLeaveEntryMutation,
    useUpdateOpeningLeaveEntryMutation,
    useDeleteOpeningLeaveEntryMutation,
} = openingLeaveEntryApi;