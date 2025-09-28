import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";

const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["products"],
  keepUnusedDataFor: 5,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (params) => `/client/inventory/products?${params || ""}`,
      providesTags: [{ type: "products", id: "LIST" }],
    }),
    fetchProduct: builder.query({
      query: (id) => `/client/inventory/products/${id}`,
      providesTags: (result, error, id) => [{ type: "products", id }],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/client/inventory/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/inventory/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "products", id },
        { type: "products", id: "LIST" },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/client/inventory/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "products", id },
        { type: "products", id: "LIST" },
      ],
    }),
   
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = products;

export default products;
