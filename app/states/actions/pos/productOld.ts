import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";
import Cookies from "js-cookie";

const productOlds = createApi({
  reducerPath: "posProductOldsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/manage-products",
    headers: jsonHeaders,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token ?? Cookies.get("authToken") ?? null;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 5,
  refetchOnReconnect: true,
  tagTypes: ["PosProductOlds", "PosProductOld"],
  endpoints: (builder) => ({
    fetchProductOlds: builder.query({
      query: (params) => `product-olds?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["PosProductOlds"],
    }),
    createProductOld: builder.mutation({
      query: (data) => ({
        url: "product-olds",
        method: "POST",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["PosProductOlds"],
    }),
    fetchProductOld: builder.query({
      query: (id) => `product-olds/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["PosProductOld"],
    }),
    updateProductOld: builder.mutation({
      query: (data) => ({
        url: `product-olds/${data.id}`,
        method: "PATCH",
        body: JSON.stringify(data),
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["PosProductOlds"],
    }),
    deleteProductOld: builder.mutation({
      query: (id) => ({
        url: `product-olds/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["PosProductOlds"],
    }),
  }),
});

export const {
  useFetchProductOldsQuery,
  useCreateProductOldMutation,
  useFetchProductOldQuery,
  useUpdateProductOldMutation,
  useDeleteProductOldMutation,
} = productOlds;

export default productOlds;
