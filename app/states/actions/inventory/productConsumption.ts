/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const productConsumptionApi = createApi({
    reducerPath: "productConsumptionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/inventory",
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
    tagTypes: ["ProductConsumption", "ProductConsumptionList"],
    endpoints: (builder) => ({
        // Get all product consumptions with pagination
        fetchProductConsumptions: builder.query({
            query: (params) => `/product-consumptions?${params || ""}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["ProductConsumptionList"],
        }),

        // Create new product consumption
        createProductConsumption: builder.mutation({
            query: (data) => ({
                url: "product-consumptions",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["ProductConsumptionList"],
        }),

        // Get single product consumption by ID
        fetchProductConsumption: builder.query({
            query: (id) => `product-consumptions/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["ProductConsumption"],
        }),

        // Update product consumption
        updateProductConsumption: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `product-consumptions/${id}`,
                method: "PUT",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: (result, error, arg) => [
                "ProductConsumptionList",
                { type: "ProductConsumption", id: arg.id },
            ],
        }),

        // Delete product consumption
        deleteProductConsumption: builder.mutation({
            query: (id) => ({
                url: `product-consumptions/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["ProductConsumptionList"],
        }),

        // Additional endpoints as needed
        getProductConsumptionReport: builder.query({
            query: (params) => `/product-consumptions/report?${params || ""}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["ProductConsumptionList"],
        }),

        // Export to Excel
        exportProductConsumptions: builder.mutation({
            query: (params) => ({
                url: `/product-consumptions/export?${params || ""}`,
                method: "GET",
                responseHandler: async (response) => {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "product_consumptions.xlsx";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                },
                cache: "no-cache",
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useFetchProductConsumptionsQuery,
    useCreateProductConsumptionMutation,
    useFetchProductConsumptionQuery,
    useUpdateProductConsumptionMutation,
    useDeleteProductConsumptionMutation,
} = productConsumptionApi;

export default productConsumptionApi;