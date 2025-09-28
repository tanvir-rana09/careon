import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "./options";

const publicApi = createApi({
    reducerPath: "publicApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/public",
        headers: jsonHeaders,
    }),
    keepUnusedDataFor: 5,
    refetchOnReconnect: true,
    tagTypes: ["PublicDepartments", "PublicSirTitles"],
    endpoints: (builder) => ({
        fetchPublicDepartments: builder.query({
            query: (params) => `departments?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PublicDepartments"],
        }),
        fetchSirTitles: builder.query({
            query: (params) => `sir-titles?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PublicSirTitles"],
        }),
    }),
});

export const { useFetchPublicDepartmentsQuery, useFetchSirTitlesQuery } =
    publicApi;

export default publicApi;
