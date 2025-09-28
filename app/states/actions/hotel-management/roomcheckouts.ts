/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const roomCheckOuts = createApi({
  reducerPath: "roomCheckOutsApi",
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
  tagTypes: ["RoomCheckOuts", "RoomCheckOut"],
  endpoints: (builder) => ({
    fetchRoomWiseSale: builder.query({
      query: (data) => `get/roomwise/sale/${data}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["RoomCheckOuts"],
    }),
    createRoomCheckOut: builder.mutation({
      query: (data) => ({
        url: "room-checkouts",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["RoomCheckOuts"],
    }),
  }),
});

export const { useFetchRoomWiseSaleQuery, useCreateRoomCheckOutMutation } =
  roomCheckOuts;

export default roomCheckOuts;
