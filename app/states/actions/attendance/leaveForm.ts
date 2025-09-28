import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

export const leaveApi = createApi({
 reducerPath: "leaveApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/attendance/leave-form",
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
  tagTypes: ['Leave'],
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: (params) => `?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ['Leave'],
    }),
    getLeaveById: builder.query({
      query: (id) => `/${id}`,
       transformResponse: (response: { data: any }) => response.data,
      providesTags: ['Leave'],
    }),
    createLeave: builder.mutation({
      query: (leaveData) => ({
        url: '',
        method: 'POST',
        body: leaveData,
      }),
    }),
    updateLeave: builder.mutation({
      query: ({ id, ...leaveData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: leaveData,
      }),
    }),
    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Leave'],
    }),
    getEmployeeLeaves: builder.query({
      query: (employeeId) => `/employee/${employeeId}`,
      providesTags: ['Leave'],
    }),
    getPendingLeaves: builder.query({
      query: () => '/pending',
      providesTags: ['Leave'],
    }),
    recommendLeave: builder.mutation({
      query: ({ id, signature }) => ({
        url: `/${id}/recommend`,
        method: 'PATCH',
        body: { signature },
      }),
      invalidatesTags: ['Leave'],
    }),
    approveLeave: builder.mutation({
      query: ({ id, signature }) => ({
        url: `/${id}/approve`,
        method: 'PATCH',
        body: { signature },
      }),
      invalidatesTags: ['Leave'],
    }),
    rejectLeave: builder.mutation({
      query: ({ id, reason, signature }) => ({
        url: `/${id}/reject`,
        method: 'PATCH',
        body: { reason, signature },
      }),
      invalidatesTags: ['Leave'],
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useGetLeaveByIdQuery,
  useCreateLeaveMutation,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
  useGetEmployeeLeavesQuery,
  useGetPendingLeavesQuery,
  useRecommendLeaveMutation,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
} = leaveApi;