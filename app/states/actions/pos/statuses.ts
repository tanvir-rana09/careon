import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const statuses = createApi({
    reducerPath: "posStatusesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/manage-products",
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
    tagTypes: ["PosStatuses", "PosStatus"],
    endpoints: (builder) => ({
        fetchStatuses: builder.query({
            query: (params) => `statuses?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosStatuses"],
        }),
        createStatus: builder.mutation({
            query: (data) => ({
                url: "statuses",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosStatuses"],
        }),
        fetchStatus: builder.query({
            query: (id) => `statuses/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosStatus"],
        }),
        updateStatus: builder.mutation({
            query: (data) => ({
                url: `statuses/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosStatuses"],
        }),
        deleteStatus: builder.mutation({
            query: (id) => ({
                url: `statuses/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosStatuses"],
        }),
    }),
});

export const {
    useFetchStatusesQuery,
    useCreateStatusMutation,
    useFetchStatusQuery,
    useUpdateStatusMutation,
    useDeleteStatusMutation,
} = statuses;

export default statuses;
