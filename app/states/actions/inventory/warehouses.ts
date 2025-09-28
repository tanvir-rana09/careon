import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

const warehouses = createApi({
  reducerPath: "warehousesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/inventory",
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
  tagTypes: ["warehouses", "warehouse"],
  keepUnusedDataFor: 5,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    fetchWarehouses: builder.query({
      query: (params) => `warhouses?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["warehouses"],
    }),
    createWarehouse: builder.mutation({
      query: (data) => ({
        url: "warhouses",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["warehouses"],
    }),
    fetchWarehouse: builder.query({
      query: (id) => `warhouses/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["warehouse"],
    }),
    updateWarehouse: builder.mutation({
      query: (data) => ({
        url: `warhouses/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["warehouses"],
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `warhouses/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["warehouses"],
    }),
  }),
});

export const {
  useFetchWarehousesQuery,
  useFetchWarehouseQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouses;

export default warehouses;
