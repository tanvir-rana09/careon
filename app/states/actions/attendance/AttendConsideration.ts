import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const attendConsiderationApi = createApi({
    reducerPath: "attendConsiderationApi",
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
    tagTypes: ["AttendConsiderations", "AttendConsideration"],
    endpoints: (builder) => ({
        fetchAttendConsiderations: builder.query({
            query: (params) => `attend-considerations?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["AttendConsiderations"],
        }),
        createAttendConsideration: builder.mutation({
            query: (data) => ({
                url: "attend-considerations",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AttendConsiderations"],
        }),
        fetchAttendConsideration: builder.query({
            query: (id) => `attend-considerations/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["AttendConsideration"],
        }),
        updateAttendConsideration: builder.mutation({
            query: (data) => ({
                url: `attend-considerations/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AttendConsiderations", "AttendConsideration"],
        }),
        deleteAttendConsideration: builder.mutation({
            query: (id) => ({
                url: `attend-considerations/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AttendConsiderations"],
        }),
    }),
});

export const {
    useFetchAttendConsiderationsQuery,
    useCreateAttendConsiderationMutation,
    useFetchAttendConsiderationQuery,
    useUpdateAttendConsiderationMutation,
    useDeleteAttendConsiderationMutation,
} = attendConsiderationApi;

export default attendConsiderationApi;