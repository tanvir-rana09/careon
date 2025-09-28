import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const users = createApi({
    reducerPath: "hrmUsersApi",
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
    tagTypes: ["HrmUsers", "HrmUser"],
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: (params) => `users?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmUsers"],
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: "users",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmUsers"],
        }),
        fetchUser: builder.query({
            query: (id) => `users/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["HrmUser"],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `users/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmUsers"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmUsers"],
        }),
    }),
});

export const {
    useFetchUsersQuery,
    useCreateUserMutation,
    useFetchUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = users;

export default users;
