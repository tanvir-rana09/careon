import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const employeeBiographyTraining = createApi({
  reducerPath: "hrmEmployeeBiographyTrainingApi",
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
  tagTypes: ["HrmEmployeeBiographyTrainings", "HrmEmployeeBiographyTraining"],
  endpoints: (builder) => ({
    fetchEmployeeBiographyTrainings: builder.query({
      query: (params) => `employee-biography-training?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["HrmEmployeeBiographyTrainings"],
    }),
    createEmployeeBiographyTraining: builder.mutation({
      query: (data) => ({
        url: `employee-biography-training`,
        method: "POST",
        body: JSON.stringify(data.data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["HrmEmployeeBiographyTrainings"],
    }),
    fetchEmployeeBiographyTraining: builder.query({
      query: (id) => `employee-biography-training/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["HrmEmployeeBiographyTraining"],
    }),
    updateEmployeeBiographyTraining: builder.mutation({
      query: (data) => ({
        url: `employee-biography-training/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data.data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: [
        "HrmEmployeeBiographyTrainings",
        "HrmEmployeeBiographyTraining",
      ],
    }),
    deleteEmployeeBiographyTraining: builder.mutation({
      query: (id) => ({
        url: `employee-biography-training/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["HrmEmployeeBiographyTrainings"],
    }),
  }),
});

export const {
  useFetchEmployeeBiographyTrainingsQuery,
  useCreateEmployeeBiographyTrainingMutation,
  useFetchEmployeeBiographyTrainingQuery,
  useUpdateEmployeeBiographyTrainingMutation,
  useDeleteEmployeeBiographyTrainingMutation,
} = employeeBiographyTraining;

export default employeeBiographyTraining;
