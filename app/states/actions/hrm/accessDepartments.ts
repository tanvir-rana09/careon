import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const accessDepartments = createApi({
    reducerPath: "hrmAccessDepartmentsApi",
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
    tagTypes: ["HrmAccessDepartments"],
    endpoints: (builder) => ({
        fetchAccessDepartments: builder.query({
            query: (params) => `access-departments?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["HrmAccessDepartments"],
        }),
        createAccessDepartment: builder.mutation({
            query: (data) => ({
                url: "access-departments",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["HrmAccessDepartments"],
        }),
    }),
});

export const {
    useFetchAccessDepartmentsQuery,
    useCreateAccessDepartmentMutation,
} = accessDepartments;

export default accessDepartments;
