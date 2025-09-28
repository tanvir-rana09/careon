/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const rooms = createApi({
  reducerPath: "roomsApi",
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
  tagTypes: ["Rooms", "Room"],
  endpoints: (builder) => ({
    fetchRooms: builder.query({
      query: (params) => `rooms?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["Rooms"],
    }),
    getCheckedInRooms: builder.query({
      query: (params) => `getcheckin/room?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["Rooms"],
    }),
    createRoom: builder.mutation({
      query: (data) => ({
        url: "rooms",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Rooms"],
    }),
    fetchRoom: builder.query({
      query: (id) => `rooms/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["Room"],
    }),
    updateRoom: builder.mutation({
      query: (data) => ({
        url: `rooms/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Rooms"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `rooms/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useFetchRoomsQuery,
  useGetCheckedInRoomsQuery,
  useCreateRoomMutation,
  useFetchRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = rooms;

export default rooms;
