import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const overTime = createApi({
    reducerPath: "overTimeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/payroll",
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
    tagTypes: ["OverTimes", "OverTime"],
    endpoints: (builder) => ({
        fetchOverTimes: builder.query({
            query: (params) => `over-times?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["OverTimes"],
        }),
        createOverTime: builder.mutation({
            query: (data) => ({
                url: "over-times",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["OverTimes"],
        }),
        fetchOverTime: builder.query({
            query: (id) => `over-times/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["OverTime"],
        }),
        updateOverTime: builder.mutation({
            query: (data) => ({
                url: `over-times/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["OverTimes", "OverTime"],
        }),
        deleteOverTime: builder.mutation({
            query: (id) => ({
                url: `over-times/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["OverTimes"],
        }),
       
    }),
});

export const {
    useFetchOverTimesQuery,
    useCreateOverTimeMutation,
    useFetchOverTimeQuery,
    useUpdateOverTimeMutation,
    useDeleteOverTimeMutation,
} = overTime;

export default overTime;