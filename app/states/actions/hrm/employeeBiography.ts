import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const employeeBiography = createApi({
    reducerPath: "hrmEmployeeBiographyApi",
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
    tagTypes: ["HrmEmployeeBiographies", "HrmEmployeeBiography"],
    endpoints: (builder) => ({
        fetchEmployeeBiographies: builder.query({
            query: (params) => `employee-biographies?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmEmployeeBiographies"],
        }),
        createEmployeeBiography: builder.mutation({
            query: (data) => ({
                url: `employee-biographies${data.type ? '/' + data.type : ''}`,
                method: "POST",
                body: JSON.stringify(data.data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmEmployeeBiographies"],
        }),
        fetchEmployeeBiography: builder.query({
            query: (id) => `employee-biographies/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["HrmEmployeeBiography"],
        }),
        updateEmployeeBiography: builder.mutation({
            query: (data) => ({
                url: `employee-biographies/${data.id}${data.type ? '/' + data.type : ''}`,
                method: "PATCH",
                body: JSON.stringify(data.data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmEmployeeBiographies", "HrmEmployeeBiography"],
        }),
        deleteEmployeeBiography: builder.mutation({
            query: (id) => ({
                url: `employee-biographies/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmEmployeeBiographies"],
        }),
    }),
});

export const {
    useFetchEmployeeBiographiesQuery,
    useCreateEmployeeBiographyMutation,
    useFetchEmployeeBiographyQuery,
    useUpdateEmployeeBiographyMutation,
    useDeleteEmployeeBiographyMutation,
} = employeeBiography;

export default employeeBiography;
