/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const subStoreOrderIssue = createApi({
    reducerPath: "subStoreOrderIssueApi",
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
    tagTypes: ["subStoreOrderIssue", "subStoreOrderIssueList"],
    endpoints: (builder) => ({
		fetchSubStoreOrderIssues: builder.query({
            query: (params) => `/sub-store-issues?${params || ""}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["subStoreOrderIssueList"],
        }),
        
		fetchSubStoreOrderIssue: builder.query({
            query: (id) => `sub-store-issues/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["subStoreOrderIssue"],
        }),
       
    }),
});

export const {
    useFetchSubStoreOrderIssuesQuery,
	useFetchSubStoreOrderIssueQuery,
	
} = subStoreOrderIssue;

export default subStoreOrderIssue;
