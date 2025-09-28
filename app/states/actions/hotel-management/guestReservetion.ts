/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const guestReservation = createApi({
  reducerPath: "guestReservationApi",
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
  tagTypes: ["GuestReservations", "GuestReservation"],
  endpoints: (builder) => ({
    fetchRoomReservationGuests: builder.query({
      query: (params) => `roomReservationGuests?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["GuestReservations"],
    }),
    createRoomReservationGuest: builder.mutation({
      query: (data) => ({
        url: "roomReservationGuests",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestReservations"],
    }),
    fetchRoomReservationGuest: builder.query({
      query: (id) => `roomReservationGuests/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["GuestReservation"],
    }),
    updateRoomReservationGuest: builder.mutation({
      query: (data) => ({
        url: `roomReservationGuests/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestReservations"],
    }),
    deleteRoomReservationGuest: builder.mutation({
      query: (id) => ({
        url: `roomReservationGuests/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["GuestReservations"],
    }),
  }),
});

export const {
  useFetchRoomReservationGuestsQuery,
  useCreateRoomReservationGuestMutation,
  useFetchRoomReservationGuestQuery,
  useUpdateRoomReservationGuestMutation,
  useDeleteRoomReservationGuestMutation,
} = guestReservation;

export default guestReservation;
