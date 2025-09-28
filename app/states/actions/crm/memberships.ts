import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberships = createApi({
    reducerPath: "crmMembershipsApi",
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
    tagTypes: ["CrmMemberships", "CrmMembership"],
    endpoints: (builder) => ({
        fetchMemberships: builder.query({
            query: (params) => `memberships?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberships"],
        }),
        createMembership: builder.mutation({
            query: (data) => ({
                url: "memberships",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberships"],
        }),
        fetchMembership: builder.query({
            query: (id) => `memberships/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMembership"],
        }),
        updateMembership: builder.mutation({
            query: (data) => ({
                url: `memberships/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberships"],
        }),
        deleteMembership: builder.mutation({
            query: (id) => ({
                url: `memberships/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberships"],
        }),
    }),
});

export const {
    useFetchMembershipsQuery,
    useCreateMembershipMutation,
    useFetchMembershipQuery,
    useUpdateMembershipMutation,
    useDeleteMembershipMutation,
} = memberships;

export default memberships;
