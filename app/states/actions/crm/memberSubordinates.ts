import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const memberSubordinates = createApi({
    reducerPath: "crmMemberSubordinatesApi",
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
    tagTypes: ["CrmMemberSubordinates", "CrmMemberSubordinate"],
    endpoints: (builder) => ({
        fetchMemberSubordinates: builder.query({
            query: (params) => `subordinates?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["CrmMemberSubordinates"],
        }),
        createMemberSubordinate: builder.mutation({
            query: (data) => ({
                url: "subordinates",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberSubordinates"],
        }),
        fetchMemberSubordinate: builder.query({
            query: (id) => `subordinates/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["CrmMemberSubordinate"],
        }),
        updateMemberSubordinate: builder.mutation({
            query: (data) => ({
                url: `subordinates/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberSubordinates"],
        }),
        deleteMemberSubordinate: builder.mutation({
            query: (id) => ({
                url: `subordinates/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["CrmMemberSubordinates"],
        }),
    }),
});

export const {
    useFetchMemberSubordinatesQuery,
    useCreateMemberSubordinateMutation,
    useFetchMemberSubordinateQuery,
    useUpdateMemberSubordinateMutation,
    useDeleteMemberSubordinateMutation,
} = memberSubordinates;

export default memberSubordinates;
