import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const payScaleApi = createApi({
    reducerPath: "payScaleApi",
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
    tagTypes: ["PayScales", "PayScale"],
    endpoints: (builder) => ({
        fetchPayScales: builder.query({
            query: (params) => `pay-scales?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PayScales"],
        }),
        createPayScale: builder.mutation({
            query: (data) => ({
                url: "pay-scales",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PayScales"],
        }),
        fetchPayScale: builder.query({
            query: (id) => `pay-scales/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PayScale"],
        }),
        updatePayScale: builder.mutation({
            query: (data) => ({
                url: `pay-scales/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PayScales", "PayScale"],
        }),
        deletePayScale: builder.mutation({
            query: (id) => ({
                url: `pay-scales/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PayScales"],
        }),
        
    }),
});

export const {
    useFetchPayScalesQuery,
    useCreatePayScaleMutation,
    useFetchPayScaleQuery,
    useUpdatePayScaleMutation,
    useDeletePayScaleMutation,
} = payScaleApi;

export default payScaleApi;