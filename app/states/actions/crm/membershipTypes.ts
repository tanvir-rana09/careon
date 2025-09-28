import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const membershipTypes = createApi({
    reducerPath: "crmMembershipTypesApi",
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
    tagTypes: ["CrmMembershipTypes", "CrmMembershipType"],
    endpoints: (builder) => ({
        fetchMembershipTypes: builder.query({
            query: (params) => `membership-types?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMembershipTypes"],
        }),
        createMembershipType: builder.mutation({
            query: (data) => ({
                url: "membership-types",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMembershipTypes"],
        }),
        fetchMembershipType: builder.query({
            query: (id) => `membership-types/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMembershipType"],
        }),
        updateMembershipType: builder.mutation({
            query: (data) => ({
                url: `membership-types/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMembershipTypes"],
        }),
        deleteMembershipType: builder.mutation({
            query: (id) => ({
                url: `membership-types/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMembershipTypes"],
        }),
    }),
});

export const {
    useFetchMembershipTypesQuery,
    useCreateMembershipTypeMutation,
    useFetchMembershipTypeQuery,
    useUpdateMembershipTypeMutation,
    useDeleteMembershipTypeMutation,
} = membershipTypes;

export default membershipTypes;
