import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";

export interface MemberType {
  id: number;
  name: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface MemberTypeResponse {
  data: MemberType[];
  from?: number;
  to?: number;
  total?: number;
  current_page?: number;
  last_page?: number;
}

export const memberTypeApi = createApi({
  reducerPath: "memberTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["MemberTypes"],
  endpoints: (builder) => ({
    fetchMemberTypes: builder.query<MemberTypeResponse, string>({
      query: (params) => ({
        url: `/member-types${params ? `?${params}` : ""}`,
        method: "GET",
      }),
      providesTags: ["MemberTypes"],
    }),
    
    fetchMemberType: builder.query<{ data: MemberType }, string>({
      query: (id) => ({
        url: `/member-types/${id}`,
        method: "GET",
      }),
      providesTags: ["MemberTypes"],
    }),
    
    createMemberType: builder.mutation<{ status: string; message: string; data: MemberType }, Partial<MemberType>>({
      query: (data) => ({
        url: "/member-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MemberTypes"],
    }),
    
    updateMemberType: builder.mutation<{ status: string; message: string; data: MemberType }, Partial<MemberType> & { id: number }>({
      query: (data) => ({
        url: `/member-types/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MemberTypes"],
    }),
    
    deleteMemberType: builder.mutation<{ status: string; message: string }, number>({
      query: (id) => ({
        url: `/member-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MemberTypes"],
    }),
  }),
});

export const {
  useFetchMemberTypesQuery,
  useFetchMemberTypeQuery,
  useCreateMemberTypeMutation,
  useUpdateMemberTypeMutation,
  useDeleteMemberTypeMutation,
} = memberTypeApi;

// Export for Redux store
export const memberTypeApiReducers = {
  memberTypeApi: memberTypeApi.reducer,
};

export const memberTypeApiMiddleWares = memberTypeApi.middleware;
