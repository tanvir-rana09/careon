import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

const shiftsApi = createApi({
    reducerPath: "shiftsApi",
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
    tagTypes: ["Shifts", "Shift"],
    endpoints: (builder) => ({
        fetchShifts: builder.query({
            query: (params) => `shifts?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Shifts"],
        }),
        fetchShift: builder.query({
            query: (id) => `shifts/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["Shift"],
        }),
        createShift: builder.mutation({
            query: (data) => ({
                url: "shifts",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Shifts"],
        }),
        updateShift: builder.mutation({
            query: (data) => ({
                url: `shifts/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Shifts"],
        }),
        deleteShift: builder.mutation({
            query: (id) => ({
                url: `shifts/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});


export const {
	useFetchShiftsQuery,
	useFetchShiftQuery,
	useCreateShiftMutation,
	useUpdateShiftMutation,
	useDeleteShiftMutation,
} = shiftsApi;

export default shiftsApi;