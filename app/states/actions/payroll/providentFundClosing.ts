import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const providentFundClosing = createApi({
    reducerPath: "providentFundClosingApi",
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
    tagTypes: ["ProvidentFundClosings", "ProvidentFundClosing"],
    endpoints: (builder) => ({
        fetchProvidentFundClosings: builder.query({
            query: (params) => `provident-fund-closings?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["ProvidentFundClosings"],
        }),
        createProvidentFundClosing: builder.mutation({
            query: (data) => ({
                url: "provident-fund-closings",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["ProvidentFundClosings"],
        }),
        fetchProvidentFundClosing: builder.query({
            query: (id) => `provident-fund-closings/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["ProvidentFundClosing"],
        }),
        updateProvidentFundClosing: builder.mutation({
            query: (data) => ({
                url: `provident-fund-closings/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["ProvidentFundClosings", "ProvidentFundClosing"],
        }),
        deleteProvidentFundClosing: builder.mutation({
            query: (id) => ({
                url: `provident-fund-closings/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["ProvidentFundClosings"],
        }),
       
    }),
});

export const {
    useFetchProvidentFundClosingsQuery,
    useCreateProvidentFundClosingMutation,
    useFetchProvidentFundClosingQuery,
    useUpdateProvidentFundClosingMutation,
    useDeleteProvidentFundClosingMutation,
} = providentFundClosing;

export default providentFundClosing;