/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const brands = createApi({
    reducerPath: "posBrandsApi",
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
    tagTypes: ["PosBrands", "PosBrand"],
    endpoints: (builder) => ({
        fetchBrands: builder.query({
            query: (params) => `brands?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosBrands"],
        }),
        createBrand: builder.mutation({
            query: (data) => ({
                url: "brands",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosBrands"],
        }),
        fetchBrand: builder.query({
            query: (id) => `brands/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosBrand"],
        }),
        updateBrand: builder.mutation({
            query: (data) => ({
                url: `brands/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosBrands"],
        }),
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `brands/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosBrands"],
        }),
    }),
});

export const {
    useFetchBrandsQuery,
    useCreateBrandMutation,
    useFetchBrandQuery,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = brands;

export default brands;
