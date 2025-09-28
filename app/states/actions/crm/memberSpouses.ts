import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberSpouses = createApi({
    reducerPath: "crmMemberSpousesApi",
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
    tagTypes: ["CrmMemberSpouses", "CrmMemberSpouse"],
    endpoints: (builder) => ({
        fetchMemberSpouses: builder.query({
            query: (params) => `spouses?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberSpouses"],
        }),
        createMemberSpouse: builder.mutation({
            query: (data) => ({
                url: "spouses",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberSpouses"],
        }),
        fetchMemberSpouse: builder.query({
            query: (id) => `spouses/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMemberSpouse"],
        }),
        updateMemberSpouse: builder.mutation({
            query: (data) => ({
                url: `spouses/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberSpouses"],
        }),
        deleteMemberSpouse: builder.mutation({
            query: (id) => ({
                url: `spouses/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberSpouses"],
        }),
    }),
});

export const {
    useFetchMemberSpousesQuery,
    useCreateMemberSpouseMutation,
    useFetchMemberSpouseQuery,
    useUpdateMemberSpouseMutation,
    useDeleteMemberSpouseMutation,
} = memberSpouses;

export default memberSpouses;
