/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const guestReservetionCohost = createApi({
  reducerPath: "guestReservetionCohostApi",
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
  tagTypes: ["GuestReservetionCohosts", "GuestReservetionCohost"],
  endpoints: (builder) => ({
    fetchGuestReservetionCohosts: builder.query({
      query: (params) => `roomReservationGuestCohosts?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["GuestReservetionCohosts"],
    }),
    createGuestReservetionCohost: builder.mutation({
      query: (data) => ({
        url: "roomReservationGuestCohosts",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestReservetionCohosts"],
    }),
    fetchGuestReservetionCohost: builder.query({
      query: (id) => `roomReservationGuestCohosts/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["GuestReservetionCohost"],
    }),
    updateGuestReservetionCohost: builder.mutation({
      query: (data) => ({
        url: `roomReservationGuestCohosts/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestReservetionCohosts"],
    }),
    deleteGuestReservetionCohost: builder.mutation({
      query: (id) => ({
        url: `roomReservationGuestCohosts/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestReservetionCohosts"],
    }),
  }),
});

export const {
  useFetchGuestReservetionCohostsQuery,
  useCreateGuestReservetionCohostMutation,
  useFetchGuestReservetionCohostQuery,
  useUpdateGuestReservetionCohostMutation,
  useDeleteGuestReservetionCohostMutation,
} = guestReservetionCohost;

export default guestReservetionCohost;
