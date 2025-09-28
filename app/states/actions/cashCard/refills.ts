import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const cashCardRefills = createApi({
    reducerPath: "cashCardRefillsApi",
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
    tagTypes: ["cashCardRefills", "cashCardRefill"],
    endpoints: (builder) => ({
        fetchCardRefills: builder.query({
            query: (params) => `load?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["cashCardRefills"],
        }),
        createCardRefill: builder.mutation({
            query: (data) => ({
                url: "load",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardRefills"],
        }),
        fetchCardRefill: builder.query({
            query: (id) => `load/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["cashCardRefill"],
        }),
        updateCardRefill: builder.mutation({
            query: (data) => ({
                url: `load/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardRefills"],
        }),
        deleteCardRefill: builder.mutation({
            query: (id) => ({
                url: `load/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardRefills"],
        }),
    }),
});

export const {
    useFetchCardRefillsQuery,
    useCreateCardRefillMutation,
    useFetchCardRefillQuery,
    useUpdateCardRefillMutation,
    useDeleteCardRefillMutation,
} = cashCardRefills;

export default cashCardRefills;
