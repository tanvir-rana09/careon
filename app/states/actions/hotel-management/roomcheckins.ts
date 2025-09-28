/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const roomCheckIns = createApi({
  reducerPath: "roomCheckInsApi",
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
  tagTypes: ["RoomCheckIns", "RoomCheckIn"],
  endpoints: (builder) => ({
    fetchRoomCheckIns: builder.query({
      query: (params) => `room-checkins?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["RoomCheckIns"],
    }),
    createRoomCheckIn: builder.mutation({
      query: (data) => ({
        url: "room-checkins",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomCheckIns"],
    }),
    fetchRoomCheckIn: builder.query({
      query: (id) => `room-checkins/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["RoomCheckIn"],
    }),
    updateRoomCheckIn: builder.mutation({
      query: (data) => ({
        url: `room-checkins/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomCheckIns"],
    }),
    deleteRoomCheckIn: builder.mutation({
      query: (id) => ({
        url: `room-checkins/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomCheckIns"],
    }),
  }),
});

export const {
  useFetchRoomCheckInsQuery,
  useCreateRoomCheckInMutation,
  useFetchRoomCheckInQuery,
  useUpdateRoomCheckInMutation,
  useDeleteRoomCheckInMutation,
} = roomCheckIns;

export default roomCheckIns;
