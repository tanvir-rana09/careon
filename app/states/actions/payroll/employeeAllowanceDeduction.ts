import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const employeeAllowanceDeductionApi = createApi({
  reducerPath: "employeeAllowanceDeductionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/payroll/employee-allowance-deductions",
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
  tagTypes: ["EmployeeAllowanceDeductions", "EmployeeAllowanceDeduction"],
  endpoints: (builder) => ({
    fetchEmployeeAllowanceDeductions: builder.query({
      query: (params) => `?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["EmployeeAllowanceDeductions"],
    }),
    createEmployeeAllowanceDeduction: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["EmployeeAllowanceDeductions"],
    }),
    fetchEmployeeAllowanceDeduction: builder.query({
      query: (id) => `${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: (result, error, id) => [{ type: "EmployeeAllowanceDeduction", id }],
    }),
    updateEmployeeAllowanceDeduction: builder.mutation({
      query: (data) => ({
        url: `${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: (result, error, arg) => [
        "EmployeeAllowanceDeductions",
        { type: "EmployeeAllowanceDeduction", id: arg.id }
      ],
    }),
    deleteEmployeeAllowanceDeduction: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["EmployeeAllowanceDeductions"],
    }),
  }),
});

export const {
  useFetchEmployeeAllowanceDeductionsQuery,
  useCreateEmployeeAllowanceDeductionMutation,
  useFetchEmployeeAllowanceDeductionQuery,
  useUpdateEmployeeAllowanceDeductionMutation,
  useDeleteEmployeeAllowanceDeductionMutation,
} = employeeAllowanceDeductionApi;

export default employeeAllowanceDeductionApi; 