import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

const holidaysApi = createApi({
    reducerPath: "holidaysApi",
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
    tagTypes: ["Holidays", "Holiday"],
    endpoints: (builder) => ({
        fetchHolidays: builder.query({
            query: (params) => `holidays?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Holidays"],
        }),
        createHoliday: builder.mutation({
            query: (data) => ({
                url: "holidays",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Holidays"],
        }),
        fetchHoliday: builder.query({
            query: (id) => `holidays/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["Holiday"],
        }),
        updateHoliday: builder.mutation({
            query: (data) => ({
                url: `holidays/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Holidays"],
        }),
        deleteHoliday: builder.mutation({
            query: (id) => ({
                url: `holidays/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Holidays"],
        }),
        createFullYearWeeklyHoliday: builder.mutation({
            query: (data) => ({
                url: `holidays/make-full-year-holiday`,
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Holidays"],
        }),
    }),
});

export const {
    useFetchHolidaysQuery,
    useCreateHolidayMutation,
    useFetchHolidayQuery,
    useUpdateHolidayMutation,
    useDeleteHolidayMutation,
    useCreateFullYearWeeklyHolidayMutation,
} = holidaysApi;

export default holidaysApi;
