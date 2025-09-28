import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const nominees = createApi({
    reducerPath: "hrmNomineesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/hrm",
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
    tagTypes: ["HrmNominees", "HrmNominee"],
    endpoints: (builder) => ({
        fetchNominees: builder.query({
            query: (params) => `nominees?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmNominees"],
        }),
        createNominee: builder.mutation({
            query: (data) => ({
                url: "nominees",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmNominees"],
        }),
        fetchNominee: builder.query({
            query: (id) => `nominees/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["HrmNominee"],
        }),
        updateNominee: builder.mutation({
            query: (data) => ({
                url: `nominees/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmNominees"],
        }),
        deleteNominee: builder.mutation({
            query: (id) => ({
                url: `nominees/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmNominees"],
        }),
    }),
});

export const {
    useFetchNomineesQuery,
    useCreateNomineeMutation,
    useFetchNomineeQuery,
    useUpdateNomineeMutation,
    useDeleteNomineeMutation,
} = nominees;

export default nominees;
