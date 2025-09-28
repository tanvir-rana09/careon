/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const centralStoreProductReceive = createApi({
    reducerPath: "centralStoreProductReceiveApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/inventory",
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
    tagTypes: ["centralStoreProductReceive", "centralStoreProductReceiveList"],
    endpoints: (builder) => ({
        fetchCentralStoreProductReceives: builder.query({
            query: (params) => `/central-stores?${params || ""}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["centralStoreProductReceiveList"],
        }),
        createCentralStoreProductReceive: builder.mutation({
            query: (data) => ({
                url: "central-stores",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["centralStoreProductReceiveList"],
        }),
        fetchCentralStoreProductReceive: builder.query({
            query: (id) => `central-stores/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["centralStoreProductReceive"],
        }),
        updateCentralStoreProductReceive: builder.mutation({
            query: (data) => ({
                url: `central-stores/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["centralStoreProductReceiveList"],
        }),
        deleteCentralStoreProductReceive: builder.mutation({
            query: (id) => ({
                url: `central-stores/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["centralStoreProductReceiveList"],
        }),
        centralStoresProductIssue: builder.mutation({
            query: (data) => ({
                url: "central-stores/product/issue",
                method: "POST",
                body: data,
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["centralStoreProductReceiveList"],
        }),
    }),
});

export const {
    useFetchCentralStoreProductReceivesQuery,
    useFetchCentralStoreProductReceiveQuery,
    useCreateCentralStoreProductReceiveMutation,
    useUpdateCentralStoreProductReceiveMutation,
    useDeleteCentralStoreProductReceiveMutation,
    useCentralStoresProductIssueMutation,
} = centralStoreProductReceive;

export default centralStoreProductReceive;
