import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const departments = createApi({
    reducerPath: "hrmDepartmentsApi",
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
    tagTypes: ["HrmDepartments", "HrmDepartment"],
    endpoints: (builder) => ({
        fetchDepartments: builder.query({
            query: (params) => `departments?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmDepartments"],
        }),
        createDepartment: builder.mutation({
            query: (data) => ({
                url: "departments",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmDepartments"],
        }),
        fetchDepartment: builder.query({
            query: (id) => `departments/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["HrmDepartment"],
        }),
        updateDepartment: builder.mutation({
            query: (data) => ({
                url: `departments/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmDepartments"],
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `departments/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmDepartments"],
        }),
    }),
});

export const {
    useFetchDepartmentsQuery,
    useCreateDepartmentMutation,
    useFetchDepartmentQuery,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
} = departments;

export default departments;
