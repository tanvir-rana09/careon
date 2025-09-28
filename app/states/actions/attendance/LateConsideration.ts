import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";
import { API_URL } from "~/constants/links";
import Cookies from "js-cookie";
import { RootState } from "~/states";

const LateConsiderationApi = createApi({
    reducerPath: "LateConsiderationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/attendance",
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
    tagTypes: ["LateConsiderations", "LateConsideration"],
    endpoints: (builder) => ({
        fetchLateConsiderations: builder.query({
            query: (params) => `late-considerations?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["LateConsiderations"],
        }),
		createLateConsideration: builder.mutation({
			query: (data) => ({
				url: "late-considerations",
				method: "POST",
				body: JSON.stringify(data),
			}),
			transformErrorResponse: (response) => response.data,
			invalidatesTags: ["LateConsiderations"],
		}),
		fetchLateConsideration: builder.query({
			query: (id) => `late-considerations/${id}`,
			transformResponse: (response: { data: any }) => response.data,
			providesTags: ["LateConsideration"],
		}),
		updateLateConsideration: builder.mutation({
			query: (data) => ({
				url: `late-considerations/${data.id}`,
				method: "PATCH",
				body: JSON.stringify(data),
			}),
			transformErrorResponse: (response) => response.data,
			invalidatesTags: ["LateConsiderations", "LateConsideration"],
		}),
		deleteLateConsideration: builder.mutation({
			query: (id) => ({
				url: `late-considerations/${id}`,
				method: "DELETE",
			}),
			transformErrorResponse: (response) => response.data,
			invalidatesTags: ["LateConsiderations", "LateConsideration"],
		})
    }),
});

export const {
	useFetchLateConsiderationsQuery,
	useCreateLateConsiderationMutation,
	useFetchLateConsiderationQuery,
	useUpdateLateConsiderationMutation,
	useDeleteLateConsiderationMutation
} = LateConsiderationApi;

export default LateConsiderationApi;
