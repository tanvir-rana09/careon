import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberCategories = createApi({
    reducerPath: "crmMemberCategoriesApi",
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
    tagTypes: ["CrmMemberCategories", "CrmMemberCategory"],
    endpoints: (builder) => ({
        fetchMemberCategories: builder.query({
            query: (params) => `member-categories?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberCategories"],
        }),
        createMemberCategory: builder.mutation({
            query: (data) => ({
                url: "member-categories",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberCategories"],
        }),
        fetchMemberCategory: builder.query({
            query: (id) => `member-categories/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMemberCategory"],
        }),
        updateMemberCategory: builder.mutation({
            query: (data) => ({
                url: `member-categories/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberCategories"],
        }),
        deleteMemberCategory: builder.mutation({
            query: (id) => ({
                url: `member-categories/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberCategories"],
        }),
    }),
});

export const {
    useFetchMemberCategoriesQuery,
    useCreateMemberCategoryMutation,
    useFetchMemberCategoryQuery,
    useUpdateMemberCategoryMutation,
    useDeleteMemberCategoryMutation,
} = memberCategories;

export default memberCategories;
