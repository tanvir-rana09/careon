import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const sales = createApi({
    reducerPath: "posSalesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/pos",
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
    tagTypes: ["PosSales", "PosSale"],
    endpoints: (builder) => ({
        fetchSales: builder.query({
            query: (params) => `sales?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosSales"],
        }),
        createSale: builder.mutation({
            query: (data) => ({
                url: "sales",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSales"],
        }),
        fetchSale: builder.query({
            query: (id) => `sales/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosSale"],
        }),
        updateSale: builder.mutation({
            query: (data) => ({
                url: `sales/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSales"],
        }),
        deleteSale: builder.mutation({
            query: (id) => ({
                url: `sales/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosSales"],
        }),
         generateSalesPdf: builder.mutation({
            query: ({ type, data }) => ({
                url: `${type}`,
                method: "POST",
                body: data,
                responseHandler: (response) => response.blob(),
            })
        }),
    }),
});

export const {
    useFetchSalesQuery,
    useCreateSaleMutation,
    useFetchSaleQuery,
    useUpdateSaleMutation,
    useDeleteSaleMutation,
    useGenerateSalesPdfMutation
} = sales;

export default sales;
