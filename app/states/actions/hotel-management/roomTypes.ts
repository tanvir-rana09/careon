/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const roomTypes = createApi({
  reducerPath: "roomTypesApi",
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
  tagTypes: ["RoomTypes", "RoomType"],
  endpoints: (builder) => ({
    fetchRoomTypes: builder.query({
      query: (params) => `room-types?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["RoomTypes"],
    }),
    createRoomType: builder.mutation({
      query: (data) => ({
        url: "room-types",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomTypes"],
    }),
    fetchRoomType: builder.query({
      query: (id) => `room-types/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["RoomType"],
    }),
    updateRoomType: builder.mutation({
      query: (data) => ({
        url: `room-types/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomTypes"],
    }),
    deleteRoomType: builder.mutation({
      query: (id) => ({
        url: `room-types/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomTypes"],
    }),
  }),
});

export const {
  useFetchRoomTypesQuery,
  useCreateRoomTypeMutation,
  useFetchRoomTypeQuery,
  useUpdateRoomTypeMutation,
  useDeleteRoomTypeMutation,
} = roomTypes;

export default roomTypes;
