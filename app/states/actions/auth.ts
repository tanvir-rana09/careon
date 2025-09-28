/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "./options";

const auth = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/auth",
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
  tagTypes: ["UserStores"],
  endpoints: (builder) => ({
    createRegister: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
    }),
    createLogin: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
    }),
    createLogout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      transformErrorResponse: (response) => response.data,
    }),
    fetchMe: builder.query({
      query: () => "me",
      transformResponse: (response: any) => response?.data,
    }),
  }),
});

export const {
  useCreateLoginMutation,
  useCreateRegisterMutation,
  useCreateLogoutMutation,
  useFetchMeQuery,
} = auth;

export default auth;
