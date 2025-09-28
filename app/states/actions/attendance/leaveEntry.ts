import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

export const leaveEntryApi = createApi({
    reducerPath: "leaveEntryApi",
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
    keepUnusedDataFor: 5,
    refetchOnReconnect: true,
    tagTypes: ["LeaveEntries", "LeaveEntry"],
    endpoints: (builder) => ({
        fetchLeaveEntries: builder.query({
            query: (params) => `leave-entry?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["LeaveEntries"],
        }),
        fetchLeaveEntry: builder.query({
            query: (id) => `leave-entry/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["LeaveEntry"],
        }),
        createLeaveEntry: builder.mutation({
            query: (data) => ({
                url: "leave-entry",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["LeaveEntries"],
        }),
        updateLeaveEntry: builder.mutation({
            query: (data) => ({
                url: `leave-entry/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["LeaveEntries", "LeaveEntry"],
        }),
        deleteLeaveEntry: builder.mutation({
            query: (id) => ({
                url: `leave-entry/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["LeaveEntries"],
        }),
        getEmployeeLeavesSummary: builder.query({
            query: (url) => `leave-entry/employee/leaves${url ? `?${url}` : ""}`,
            transformResponse: (response: { data: any }) => response.data,
        }),
    }),
});

export const {
    useFetchLeaveEntriesQuery,
    useFetchLeaveEntryQuery,
    useCreateLeaveEntryMutation,
    useUpdateLeaveEntryMutation,
    useDeleteLeaveEntryMutation,
    useGetEmployeeLeavesSummaryQuery
} = leaveEntryApi;