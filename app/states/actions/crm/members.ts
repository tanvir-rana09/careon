import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const members = createApi({
    reducerPath: "crmMembersApi",
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
    tagTypes: ["CrmMembers", "CrmMember"],
    endpoints: (builder) => ({
        fetchMembers: builder.query({
            query: (params) => `members?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMembers"],
        }),
        fetchMembersCharge: builder.query({
            query: () => `charge`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMembers"],
        }),
        createMember: builder.mutation({
            query: (data) => ({
                url: "members",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMembers"],
        }),
        fetchMember: builder.query({
            query: (id) => `members/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMember"],
        }),
        updateMember: builder.mutation({
            query: (data) => ({
                url: `members/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMembers"],
        }),
        deleteMember: builder.mutation({
            query: (id) => ({
                url: `members/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMembers"],
        }),
        generateMembersReportPdf: builder.mutation({
            query: ({ type, data }) => ({
                url: `${type}`,
                method: "POST",
                body: data,
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
});

export const {
    useFetchMembersQuery,
    useFetchMembersChargeQuery,
    useCreateMemberMutation,
    useFetchMemberQuery,
    useUpdateMemberMutation,
    useDeleteMemberMutation,
useGenerateMembersReportPdfMutation
} = members;

export default members;
