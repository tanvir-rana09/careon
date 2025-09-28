import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const employeeBiographyQualification = createApi({
  reducerPath: "hrmEmployeeBiographyQualificationApi",
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
  tagTypes: [
    "HrmEmployeeBiographyQualifications",
    "HrmEmployeeBiographyQualification",
  ],
  endpoints: (builder) => ({
    fetchEmployeeBiographyQualifications: builder.query({
      query: (params) => `employee-biography-qualification?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["HrmEmployeeBiographyQualifications"],
    }),
    createEmployeeBiographyQualification: builder.mutation({
      query: (data) => ({
        url: `employee-biography-qualification`,
        method: "POST",
        body: JSON.stringify(data.data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["HrmEmployeeBiographyQualifications"],
    }),
    fetchEmployeeBiographyQualification: builder.query({
      query: (id) => `employee-biography-qualification/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["HrmEmployeeBiographyQualification"],
    }),
    updateEmployeeBiographyQualification: builder.mutation({
      query: (data) => ({
        url: `employee-biography-qualification/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data.data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: [
        "HrmEmployeeBiographyQualifications",
        "HrmEmployeeBiographyQualification",
      ],
    }),
    deleteEmployeeBiographyQualification: builder.mutation({
      query: (id) => ({
        url: `employee-biography-qualification/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["HrmEmployeeBiographyQualifications"],
    }),
  }),
});

export const {
  useFetchEmployeeBiographyQualificationsQuery,
  useCreateEmployeeBiographyQualificationMutation,
  useFetchEmployeeBiographyQualificationQuery,
  useUpdateEmployeeBiographyQualificationMutation,
  useDeleteEmployeeBiographyQualificationMutation,
} = employeeBiographyQualification;

export default employeeBiographyQualification;
