import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const roles = createApi({
    reducerPath: "hrmRolesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/hrm",
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
    tagTypes: ["HrmRoles", "HrmRole"],
    endpoints: (builder) => ({
        fetchRoles: builder.query({
            query: (params) => `roles?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmRoles"],
        }),
        createRole: builder.mutation({
            query: (data) => ({
                url: "roles",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmRoles"],
        }),
        fetchRole: builder.query({
            query: (id) => `roles/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["HrmRole"],
        }),
        updateRole: builder.mutation({
            query: (data) => ({
                url: `roles/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmRoles"],
        }),
        deleteRole: builder.mutation({
            query: (id) => ({
                url: `roles/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmRoles"],
        }),
    }),
});

export const {
    useFetchRolesQuery,
    useCreateRoleMutation,
    useFetchRoleQuery,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
} = roles;

export default roles;
