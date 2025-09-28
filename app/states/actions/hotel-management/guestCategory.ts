/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const guestCategory = createApi({
  reducerPath: "guestCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/reservation",
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
  tagTypes: ["GuestCategories", "GuestCategory"],
  endpoints: (builder) => ({
    fetchGuestCategories: builder.query({
      query: (params) => `guestCategories?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["GuestCategories"],
    }),
    createGuestCategory: builder.mutation({
      query: (data) => ({
        url: "guestCategories",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestCategories"],
    }),
    fetchGuestCategory: builder.query({
      query: (id) => `guestCategories/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["GuestCategory"],
    }),
    updateGuestCategory: builder.mutation({
      query: (data) => ({
        url: `guestCategories/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestCategories"],
    }),
    deleteGuestCategory: builder.mutation({
      query: (id) => ({
        url: `guestCategories/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestCategories"],
    }),
  }),
});

export const {
  useFetchGuestCategoriesQuery,
  useCreateGuestCategoryMutation,
  useFetchGuestCategoryQuery,
  useUpdateGuestCategoryMutation,
  useDeleteGuestCategoryMutation,
} = guestCategory;

export default guestCategory;
