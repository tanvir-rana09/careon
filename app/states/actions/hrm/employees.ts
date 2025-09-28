import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const employees = createApi({
    reducerPath: "hrmEmployeesApi",
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
    tagTypes: ["HrmEmployees", "HrmEmployee"],
    endpoints: (builder) => ({
        fetchEmployees: builder.query({
            query: (params) => `employees?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmEmployees"],
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: "employees",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmEmployees"],
        }),
        fetchEmployee: builder.query({
            query: (id) => `employees/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["HrmEmployee"],
        }),
        updateEmployee: builder.mutation({
            query: (data) => ({
                url: `employees/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmEmployees"],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `employees/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmEmployees"],
        }),
        fetchEmployeeForBonus: builder.query({
            query: (params) => `employees/bonuses?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmEmployees"],
        })
         
    }),
});

export const {
    useFetchEmployeesQuery,
    useCreateEmployeeMutation,
    useFetchEmployeeQuery,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useFetchEmployeeForBonusQuery
} = employees;

export default employees;
