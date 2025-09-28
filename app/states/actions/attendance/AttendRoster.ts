import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

const attendRosterApi = createApi({
    reducerPath: "attendRosterApi",
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
    tagTypes: ["AttendRosters", "AttendRoster"],
    endpoints: (builder) => ({
        fetchAttendRosters: builder.query({
            query: (params) => `attend-rosters?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["AttendRosters"],
        }),
        fetchAttendRoster: builder.query({
            query: (id) => `attend-rosters/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["AttendRoster"],
        }),
        createAttendRoster: builder.mutation({
            query: (data) => ({
                url: "attend-rosters",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AttendRosters"],
        }),
        updateAttendRoster: builder.mutation({
            query: (data) => ({
                url: `attend-rosters/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AttendRosters", "AttendRoster"],
        }),
        deleteAttendRoster: builder.mutation({
            query: (id) => ({
                url: `attend-rosters/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AttendRosters"],
        }),
    }),
});

export const {
    useFetchAttendRostersQuery,
    useFetchAttendRosterQuery,
    useCreateAttendRosterMutation,
    useUpdateAttendRosterMutation,
    useDeleteAttendRosterMutation,
} = attendRosterApi;

export default attendRosterApi;