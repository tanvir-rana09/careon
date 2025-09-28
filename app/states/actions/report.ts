import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";

const reportsApi = createApi({
	reducerPath: "reportsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL + "", // Base URL up to /accounts
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as RootState;
			const token = state.auth.token ?? Cookies.get("authToken") ?? null;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			headers.set("Accept", "application/json");
			return headers;
		},
	}),
	keepUnusedDataFor: 5,
	refetchOnReconnect: true,
	tagTypes: ["Reports", "Report"],
	endpoints: (builder) => ({
		
		generatePdf: builder.mutation({
			query: ({ type, data={} }) => ({
				url: `${type}`,
				method: "POST",
				body: data,
				responseHandler: (response) => response.blob(),
			}),
			transformErrorResponse: (response) => response.data,
			invalidatesTags: ["Reports"],
		}),
		
	}),
});

// Export hooks
export const {
	useGeneratePdfMutation,
} = reportsApi;

export default reportsApi;
