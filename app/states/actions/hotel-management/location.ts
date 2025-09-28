/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const location = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/location",
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
  tagTypes: ["Location"],
  endpoints: (builder) => ({
    fetchDistricts: builder.query({
      query: (params) => `districts?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["Location"],
    }),

    fetchDistrict: builder.query({
      query: (id) => `district/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["Location"],
    }),
  }),
});

export const { useFetchDistrictsQuery, useFetchDistrictQuery } = location;

export default location;
