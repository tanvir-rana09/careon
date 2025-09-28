import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const recipeProducts = createApi({
    reducerPath: "posRecipeProductsApi",
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
    tagTypes: ["PosRecipeProducts", "PosRecipeProduct"],
    endpoints: (builder) => ({
        fetchRecipeProducts: builder.query({
            query: (params) => `recipe-products?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosRecipeProducts"],
        }),
        createRecipeProduct: builder.mutation({
            query: (data) => ({
                url: "recipe-products",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosRecipeProducts"],
        }),
        fetchRecipeProduct: builder.query({
            query: (id) => `recipe-products/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosRecipeProduct"],
        }),
        updateRecipeProduct: builder.mutation({
            query: (data) => ({
                url: `recipe-products/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosRecipeProducts"],
        }),
        deleteRecipeProduct: builder.mutation({
            query: (id) => ({
                url: `recipe-products/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosRecipeProducts"],
        }),
    }),
});

export const {
    useFetchRecipeProductsQuery,
    useCreateRecipeProductMutation,
    useFetchRecipeProductQuery,
    useUpdateRecipeProductMutation,
    useDeleteRecipeProductMutation,
} = recipeProducts;

export default recipeProducts;
