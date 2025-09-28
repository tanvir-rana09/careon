import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const sirTitles = createApi({
    reducerPath: "systemSirTitlesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/system",
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
    tagTypes: ["SystemSirTitles", "SystemSirTitle"],
    endpoints: (builder) => ({
        fetchSirTitles: builder.query({
            query: (params) => `sir-titles?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["SystemSirTitles"],
        }),
        createSirTitle: builder.mutation({
            query: (data) => ({
                url: "sir-titles",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SystemSirTitles"],
        }),
        fetchSirTitle: builder.query({
            query: (id) => `sir-titles/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["SystemSirTitle"],
        }),
        updateSirTitle: builder.mutation({
            query: (data) => ({
                url: `sir-titles/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SystemSirTitles"],
        }),
        deleteSirTitle: builder.mutation({
            query: (id) => ({
                url: `sir-titles/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["SystemSirTitles"],
        }),
    }),
});

export const {
    useFetchSirTitlesQuery,
    useCreateSirTitleMutation,
    useFetchSirTitleQuery,
    useUpdateSirTitleMutation,
    useDeleteSirTitleMutation,
} = sirTitles;

export default sirTitles;
