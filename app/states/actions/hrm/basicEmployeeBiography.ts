import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const basicEmployeeBiography = createApi({
  reducerPath: "hrmBasicEmployeeBiographyApi",
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
  tagTypes: ["HrmBasicEmployeeBiographies", "HrmBasicEmployeeBiography"],
  endpoints: (builder) => ({
    fetchBasicEmployeeBiographies: builder.query({
      query: (params) => `employee-biography-basic?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["HrmBasicEmployeeBiographies"],
    }),
    createBasicEmployeeBiography: builder.mutation({
      query: (data) => ({
        url: `employee-biography-basic`,
        method: "POST",
        body: JSON.stringify(data.data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["HrmBasicEmployeeBiographies"],
    }),
    fetchBasicEmployeeBiography: builder.query({
      query: (id) => `employee-biography-basic/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["HrmBasicEmployeeBiography"],
    }),
    updateBasicEmployeeBiography: builder.mutation({
      query: (data) => ({
        url: `employee-biography-basic/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data.data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: [
        "HrmBasicEmployeeBiographies",
        "HrmBasicEmployeeBiography",
      ],
    }),
    deleteBasicEmployeeBiography: builder.mutation({
      query: (id) => ({
        url: `employee-biography-basic/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["HrmBasicEmployeeBiographies"],
    }),
  }),
});

export const {
  useFetchBasicEmployeeBiographiesQuery,
  useCreateBasicEmployeeBiographyMutation,
  useFetchBasicEmployeeBiographyQuery,
  useUpdateBasicEmployeeBiographyMutation,
  useDeleteBasicEmployeeBiographyMutation,
} = basicEmployeeBiography;

export default basicEmployeeBiography;
