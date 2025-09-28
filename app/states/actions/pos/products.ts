import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";
import Cookies from "js-cookie";

const products = createApi({
    reducerPath: "posProductsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/manage-products",
        headers: jsonHeaders,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token ?? Cookies.get("authToken") ?? null;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 5,
    refetchOnReconnect: true,
    tagTypes: ["PosProducts", "PosProduct"],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: (params) => `products?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosProducts"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: "products",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosProducts"],
        }),
        fetchProduct: builder.query({
            query: (id) => `products/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosProduct"],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `products/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosProducts"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosProducts"],
        }),
        lastAddedProductId: builder.query({
            query: () => `last-added-product`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosProducts"],
        }),
    }),
});

export const {
    useFetchProductsQuery,
    useCreateProductMutation,
    useFetchProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useLastAddedProductIdQuery,
} = products;

export default products;
