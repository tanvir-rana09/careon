import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberReferences = createApi({
    reducerPath: "crmMemberReferencesApi",
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
    tagTypes: ["CrmMemberReferences", "CrmMemberReference"],
    endpoints: (builder) => ({
        fetchMemberReferences: builder.query({
            query: (params) => `references?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberReferences"],
        }),
        createMemberReference: builder.mutation({
            query: (data) => ({
                url: "references",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberReferences"],
        }),
        fetchMemberReference: builder.query({
            query: (id) => `references/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMemberReference"],
        }),
        updateMemberReference: builder.mutation({
            query: (data) => ({
                url: `references/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberReferences"],
        }),
        deleteMemberReference: builder.mutation({
            query: (id) => ({
                url: `references/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberReferences"],
        }),
    }),
});

export const {
    useFetchMemberReferencesQuery,
    useCreateMemberReferenceMutation,
    useFetchMemberReferenceQuery,
    useUpdateMemberReferenceMutation,
    useDeleteMemberReferenceMutation,
} = memberReferences;

export default memberReferences;
