import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import Cookies from "js-cookie";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";
export const employeeTypeApi = createApi({
  reducerPath: "employeeTypeApi",
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
  tagTypes: ["EmployeeTypes"],
  endpoints: (builder) => ({
    fetchEmployeeTypes: builder.query({
      query: (params) => ({
        url: `/employee-types${params ? `?${params}` : ""}`,
        method: "GET",
      }),
      providesTags: ["EmployeeTypes"],
    }),

    fetchEmployeeType: builder.query({
      query: (id) => ({
        url: `/employee-types/${id}`,
        method: "GET",
      }),
      providesTags: ["EmployeeTypes"],
    }),

    createEmployeeType: builder.mutation({
      query: (data) => ({
        url: "/employee-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EmployeeTypes"],
    }),

    updateEmployeeType: builder.mutation({
      query: (data) => ({
        url: `/employee-types/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EmployeeTypes"],
    }),

    deleteEmployeeType: builder.mutation({
      query: (id) => ({
        url: `/employee-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmployeeTypes"],
    }),
    fetchUniqueGrades: builder.query({
      query: () => `employees/grades`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["EmployeeTypes"],
    }),
  }),
});

export const {
  useFetchEmployeeTypesQuery,
  useFetchEmployeeTypeQuery,
  useCreateEmployeeTypeMutation,
  useUpdateEmployeeTypeMutation,
  useDeleteEmployeeTypeMutation,
  useFetchUniqueGradesQuery,
} = employeeTypeApi;

// Add this to your exports in actions/index.ts
export const employeeTypeApiReducers = {
  employeeTypeApi: employeeTypeApi.reducer,
};

export const employeeTypeApiMiddleWares = employeeTypeApi.middleware;
