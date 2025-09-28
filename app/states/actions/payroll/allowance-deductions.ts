import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const allowanceDeductionTypeApi = createApi({
    reducerPath: "allowanceDeductionTypeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/payroll/allowance-deduction-types",
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
    tagTypes: ["AllowanceDeductionTypes", "AllowanceDeductionType"],
    endpoints: (builder) => ({
        fetchAllowanceDeductionTypes: builder.query({
            query: (params) => `?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["AllowanceDeductionTypes"],
        }),
        createAllowanceDeductionType: builder.mutation({
            query: (data) => ({
                url: "",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AllowanceDeductionTypes"],
        }),
        fetchAllowanceDeductionType: builder.query({
            query: (id) => `${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: (result, error, id) => [
                { type: "AllowanceDeductionType", id },
            ],
        }),
        updateAllowanceDeductionType: builder.mutation({
            query: (data) => ({
                url: `${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: (result, error, arg) => [
                "AllowanceDeductionTypes",
                { type: "AllowanceDeductionType", id: arg.id },
            ],
        }),
        deleteAllowanceDeductionType: builder.mutation({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["AllowanceDeductionTypes"],
        }),
    }),
});

export const {
    useFetchAllowanceDeductionTypesQuery,
    useCreateAllowanceDeductionTypeMutation,
    useFetchAllowanceDeductionTypeQuery,
    useUpdateAllowanceDeductionTypeMutation,
    useDeleteAllowanceDeductionTypeMutation,
} = allowanceDeductionTypeApi;

export default allowanceDeductionTypeApi;
