import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberProfessions = createApi({
    reducerPath: "crmMemberProfessionsApi",
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
    tagTypes: ["CrmMemberProfessions", "CrmMemberProfession"],
    endpoints: (builder) => ({
        fetchMemberProfessions: builder.query({
            query: (params) => `professions?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberProfessions"],
        }),
        createMemberProfession: builder.mutation({
            query: (data) => ({
                url: "professions",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberProfessions"],
        }),
        fetchMemberProfession: builder.query({
            query: (id) => `professions/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMemberProfession"],
        }),
        updateMemberProfession: builder.mutation({
            query: (data) => ({
                url: `professions/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberProfessions"],
        }),
        deleteMemberProfession: builder.mutation({
            query: (id) => ({
                url: `professions/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberProfessions"],
        }),
    }),
});

export const {
    useFetchMemberProfessionsQuery,
    useCreateMemberProfessionMutation,
    useFetchMemberProfessionQuery,
    useUpdateMemberProfessionMutation,
    useDeleteMemberProfessionMutation,
} = memberProfessions;

export default memberProfessions;
