/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const roomReservation = createApi({
  reducerPath: "roomReservationApi",
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
  tagTypes: ["RoomReservations", "RoomReservation"],
  endpoints: (builder) => ({
    fetchRoomReservations: builder.query({
      query: (params) => `room-reservations?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["RoomReservations"],
    }),
    createRoomReservation: builder.mutation({
      query: (data) => ({
        url: "room-reservations",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomReservations"],
    }),
    fetchRoomReservation: builder.query({
      query: (id) => `room-reservations/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["RoomReservation"],
    }),
    updateRoomReservation: builder.mutation({
      query: (data) => ({
        url: `room-reservations/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomReservations"],
    }),
    deleteRoomReservation: builder.mutation({
      query: (id) => ({
        url: `room-reservations/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomReservations"],
    }),
  }),
});

export const {
  useFetchRoomReservationsQuery,
  useCreateRoomReservationMutation,
  useFetchRoomReservationQuery,
  useUpdateRoomReservationMutation,
  useDeleteRoomReservationMutation,
} = roomReservation;

export default roomReservation;
