import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const kotBotApi = createApi({
    reducerPath: "kotBotApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/pos/kot-bot",
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
    tagTypes: ["KotBots", "KotBot"],
    endpoints: (builder) => ({
        fetchKotBots: builder.query({
            query: (params) => `?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["KotBots"],
        }),
        createKotBot: builder.mutation({
            query: (data) => ({
                url: "",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["KotBots"],
        }),
        fetchKotBot: builder.query({
            query: ({ id }) => `${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: (result, error, { id }) => [{ type: "KotBot", id }],
        }),
        updateKotBot: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: (result, error, { id }) => [
                { type: "KotBot", id },
                "KotBots",
            ],
        }),
        deleteKotBot: builder.mutation({
            query: ({ id }) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["KotBots"],
        }),
    }),
});

export const {
    useFetchKotBotsQuery,
    useCreateKotBotMutation,
    useFetchKotBotQuery,
    useUpdateKotBotMutation,
    useDeleteKotBotMutation,
} = kotBotApi;

export default kotBotApi;