import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";

export interface MemberTitle {
  id: number;
  name: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface MemberTitleResponse {
  data: MemberTitle[];
  from?: number;
  to?: number;
  total?: number;
  current_page?: number;
  last_page?: number;
}

export const memberTitleApi = createApi({
  reducerPath: "memberTitleApi",
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
  tagTypes: ["MemberTitles"],
  endpoints: (builder) => ({
    fetchMemberTitles: builder.query<MemberTitleResponse, string>({
      query: (params) => ({
        url: `/member-titles${params ? `?${params}` : ""}`,
        method: "GET",
      }),
      providesTags: ["MemberTitles"],
    }),
    
    fetchMemberTitle: builder.query<{ data: MemberTitle }, string>({
      query: (id) => ({
        url: `/member-titles/${id}`,
        method: "GET",
      }),
      providesTags: ["MemberTitles"],
    }),
    
    createMemberTitle: builder.mutation<{ status: string; message: string; data: MemberTitle }, Partial<MemberTitle>>({
      query: (data) => ({
        url: "/member-titles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MemberTitles"],
    }),
    
    updateMemberTitle: builder.mutation<{ status: string; message: string; data: MemberTitle }, Partial<MemberTitle> & { id: number }>({
      query: (data) => ({
        url: `/member-titles/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MemberTitles"],
    }),
    
    deleteMemberTitle: builder.mutation<{ status: string; message: string }, number>({
      query: (id) => ({
        url: `/member-titles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MemberTitles"],
    }),
  }),
});

export const {
  useFetchMemberTitlesQuery,
  useFetchMemberTitleQuery,
  useCreateMemberTitleMutation,
  useUpdateMemberTitleMutation,
  useDeleteMemberTitleMutation,
} = memberTitleApi;

// Export for Redux store
export const memberTitleApiReducers = {
  memberTitleApi: memberTitleApi.reducer,
};

export const memberTitleApiMiddleWares = memberTitleApi.middleware;
