import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberChildren = createApi({
    reducerPath: "crmMemberChildrenApi",
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
    tagTypes: ["CrmMemberChildren", "CrmMemberChild"],
    endpoints: (builder) => ({
        fetchMemberChildren: builder.query({
            query: (params) => `children?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberChildren"],
        }),
        createMemberChild: builder.mutation({
            query: (data) => ({
                url: "children",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberChildren"],
        }),
        fetchMemberChild: builder.query({
            query: (id) => `children/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMemberChild"],
        }),
        updateMemberChild: builder.mutation({
            query: (data) => ({
                url: `children/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberChildren"],
        }),
        deleteMemberChild: builder.mutation({
            query: (id) => ({
                url: `children/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberChildren"],
        }),
    }),
});

export const {
    useFetchMemberChildrenQuery,
    useCreateMemberChildMutation,
    useFetchMemberChildQuery,
    useUpdateMemberChildMutation,
    useDeleteMemberChildMutation,
} = memberChildren;

export default memberChildren;
