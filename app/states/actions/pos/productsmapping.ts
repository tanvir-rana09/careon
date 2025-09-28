import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";
import Cookies from "js-cookie";

const productsMapping = createApi({
    reducerPath: "productsMapping",
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
    tagTypes: [ "ProductMappings", "ProductMapping"],
    endpoints: (builder) => ({
      
        // Product-Department Mapping Endpoints
        fetchProductMappings: builder.query({
            query: (params) => `product-department-mappings?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["ProductMappings"],
        }),
        createProductMapping: builder.mutation({
            query: (data) => ({
                url: "product-department-mappings",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["ProductMappings",],
        }),
        fetchProductMapping: builder.query({
            query: (id) => `product-department-mappings/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["ProductMapping"],
        }),
        updateProductMapping: builder.mutation({
            query: (data) => ({
                url: `product-department-mappings/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["ProductMappings"],
        }),
        deleteProductMapping: builder.mutation({
            query: (id) => ({
                url: `product-department-mappings/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["ProductMappings"],
        }),
       
    }),
});

export const {

    
    // Product-Department Mapping Hooks
    useFetchProductMappingsQuery,
    useCreateProductMappingMutation,
    useFetchProductMappingQuery,
    useUpdateProductMappingMutation,
    useDeleteProductMappingMutation,
} = productsMapping;

export default productsMapping;