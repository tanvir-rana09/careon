import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const employeeBiographyExperience = createApi({
  reducerPath: "hrmEmployeeBiographyExperienceApi",
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
    "HrmEmployeeBiographyExperiences",
    "HrmEmployeeBiographyExperience",
  ],
  endpoints: (builder) => ({
    fetchEmployeeBiographyExperiences: builder.query({
      query: (params) => `employee-biography-experience?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["HrmEmployeeBiographyExperiences"],
    }),
    createEmployeeBiographyExperience: builder.mutation({
      query: (data) => ({
        url: `employee-biography-experience`,
        method: "POST",
        body: JSON.stringify(data.data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["HrmEmployeeBiographyExperiences"],
    }),
    fetchEmployeeBiographyExperience: builder.query({
      query: (id) => `employee-biography-experience/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["HrmEmployeeBiographyExperience"],
    }),
    updateEmployeeBiographyExperience: builder.mutation({
      query: (data) => ({
        url: `employee-biography-experience/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data.data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: [
        "HrmEmployeeBiographyExperiences",
        "HrmEmployeeBiographyExperience",
      ],
    }),
    deleteEmployeeBiographyExperience: builder.mutation({
      query: (id) => ({
        url: `employee-biography-experience/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["HrmEmployeeBiographyExperiences"],
    }),
  }),
});

export const {
  useFetchEmployeeBiographyExperiencesQuery,
  useCreateEmployeeBiographyExperienceMutation,
  useFetchEmployeeBiographyExperienceQuery,
  useUpdateEmployeeBiographyExperienceMutation,
  useDeleteEmployeeBiographyExperienceMutation,
} = employeeBiographyExperience;

export default employeeBiographyExperience;
