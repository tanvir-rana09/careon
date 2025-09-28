import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const designations = createApi({
    reducerPath: "hrmDesignationsApi",
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
    tagTypes: ["HrmDesignations", "HrmDesignation"],
    endpoints: (builder) => ({
        fetchDesignations: builder.query({
            query: (params) => `designations?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmDesignations"],
        }),
        createDesignation: builder.mutation({
            query: (data) => ({
                url: "designations",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmDesignations"],
        }),
        fetchDesignation: builder.query({
            query: (id) => `designations/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["HrmDesignation"],
        }),
        updateDesignation: builder.mutation({
            query: (data) => ({
                url: `designations/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmDesignations"],
        }),
        deleteDesignation: builder.mutation({
            query: (id) => ({
                url: `designations/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmDesignations"],
        }),
    }),
});

export const {
    useFetchDesignationsQuery,
    useCreateDesignationMutation,
    useFetchDesignationQuery,
    useUpdateDesignationMutation,
    useDeleteDesignationMutation,
} = designations;

export default designations;
