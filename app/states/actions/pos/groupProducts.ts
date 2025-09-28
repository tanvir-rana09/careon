import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const groupProducts = createApi({
    reducerPath: "posGroupProductsApi",
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
    tagTypes: ["PosGroupProducts", "PosGroupProduct"],
    endpoints: (builder) => ({
        fetchGroupProducts: builder.query({
            query: (params) => `group-products?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosGroupProducts"],
        }),
        createGroupProduct: builder.mutation({
            query: (data) => ({
                url: "group-products",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosGroupProducts"],
        }),
        fetchGroupProduct: builder.query({
            query: (id) => `group-products/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosGroupProduct"],
        }),
        updateGroupProduct: builder.mutation({
            query: (data) => ({
                url: `group-products/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosGroupProducts"],
        }),
        deleteGroupProduct: builder.mutation({
            query: (id) => ({
                url: `group-products/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosGroupProducts"],
        }),
    }),
});

export const {
    useFetchGroupProductsQuery,
    useCreateGroupProductMutation,
    useFetchGroupProductQuery,
    useUpdateGroupProductMutation,
    useDeleteGroupProductMutation,
} = groupProducts;

export default groupProducts;
