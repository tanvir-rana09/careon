import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "./options";

const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/dashboard",
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
    tagTypes: ["Dashboard"],
    endpoints: (builder) => ({
        fetchStatistics: builder.query({
            query: () => "statistics",
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Dashboard"],
        }),
        fetchRecentSales: builder.query({
            query: () => "recent-sales",
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Dashboard"],
        }),
		fetchMonthlySales: builder.query({
            query: () => "monthly-sales-financial",
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Dashboard"],
        }),
		fetchRecentPurchases: builder.query({
            query: () => "recent-purchases",
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Dashboard"],
        }),

    }),
});

export const {
    useFetchStatisticsQuery,
    useFetchRecentSalesQuery,
	useFetchMonthlySalesQuery,
	useFetchRecentPurchasesQuery
} = dashboardApi;

export default dashboardApi;