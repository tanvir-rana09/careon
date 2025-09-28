import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const types = createApi({
    reducerPath: "posTypesApi",
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
    tagTypes: ["PosTypes", "PosType"],
    endpoints: (builder) => ({
        fetchTypes: builder.query({
            query: (params) => `types?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosTypes"],
        }),
        createType: builder.mutation({
            query: (data) => ({
                url: "types",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosTypes"],
        }),
        fetchType: builder.query({
            query: (id) => `types/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosType"],
        }),
        updateType: builder.mutation({
            query: (data) => ({
                url: `types/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosTypes"],
        }),
        deleteType: builder.mutation({
            query: (id) => ({
                url: `types/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosTypes"],
        }),
    }),
});

export const {
    useFetchTypesQuery,
    useCreateTypeMutation,
    useFetchTypeQuery,
    useUpdateTypeMutation,
    useDeleteTypeMutation,
} = types;

export default types;
