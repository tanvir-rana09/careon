import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberDocuments = createApi({
    reducerPath: "crmMemberDocumentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/crm",
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
    tagTypes: ["CrmMemberDocuments", "CrmMemberDocument"],
    endpoints: (builder) => ({
        fetchMemberDocuments: builder.query({
            query: (params) => `documents?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberDocuments"],
        }),
        createMemberDocument: builder.mutation({
            query: (data) => ({
                url: "documents",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberDocuments"],
        }),
        fetchMemberDocument: builder.query({
            query: (id) => `documents/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMemberDocument"],
        }),
        updateMemberDocument: builder.mutation({
            query: (data) => ({
                url: `documents/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberDocuments"],
        }),
        deleteMemberDocument: builder.mutation({
            query: (id) => ({
                url: `documents/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberDocuments"],
        }),
    }),
});

export const {
    useFetchMemberDocumentsQuery,
    useCreateMemberDocumentMutation,
    useFetchMemberDocumentQuery,
    useUpdateMemberDocumentMutation,
    useDeleteMemberDocumentMutation,
} = memberDocuments;

export default memberDocuments;
