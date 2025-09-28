import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";

export const employeeTitleApi = createApi({
  reducerPath: "employeeTitleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/system",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["EmployeeTitles"],
  endpoints: (builder) => ({
    fetchEmployeeTitles: builder.query({
      query: (params) => ({
        url: `/sir-titles${params ? `?${params}` : ""}`,
        method: "GET",
      }),
      providesTags: ["EmployeeTitles"],
    }),

    fetchEmployeeTitle: builder.query({
      query: (id) => ({
        url: `/sir-titles/${id}`,
        method: "GET",
      }),
      providesTags: ["EmployeeTitles"],
    }),

    createEmployeeTitle: builder.mutation({
      query: (data) => ({
        url: "/sir-titles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EmployeeTitles"],
    }),

    updateEmployeeTitle: builder.mutation({
      query: (data) => ({
        url: `/sir-titles/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EmployeeTitles"],
    }),

    deleteEmployeeTitle: builder.mutation({
      query: (id) => ({
        url: `/sir-titles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmployeeTitles"],
    }),
  }),
});

export const {
  useFetchEmployeeTitlesQuery,
  useFetchEmployeeTitleQuery,
  useCreateEmployeeTitleMutation,
  useUpdateEmployeeTitleMutation,
  useDeleteEmployeeTitleMutation,
} = employeeTitleApi;

// Add this to your exports in actions/index.ts
export const employeeTitleApiReducers = {
  employeeTitleApi: employeeTitleApi.reducer,
};

export const employeeTitleApiMiddleWares = employeeTitleApi.middleware;
