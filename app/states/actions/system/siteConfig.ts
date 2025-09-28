import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";

const companyApi = createApi({
    reducerPath: "companyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
			// headers.set("Content-Type", "multipart/form-data");
            headers.set("Accept", "application/json");
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
    tagTypes: ["Company"],
    endpoints: (builder) => ({
        fetchCompany: builder.query({
            query: (params) => `/system/companies?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Company"],
        }),
        fetchCompanyLogo: builder.query({
            query: () => "/public/company-logo",
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Company"],
        }),
        updateCompany: builder.mutation({
            query: (formData) => ({
                url: `/system/companies/1`,
                method: "POST",
                body: formData,
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Company"],
        }),
    }),
});

export const { useFetchCompanyQuery, useUpdateCompanyMutation, useFetchCompanyLogoQuery } = companyApi;

export default companyApi;
