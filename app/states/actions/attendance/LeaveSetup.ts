import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

const leaveSetupApi = createApi({
    reducerPath: "leaveSetupApi",
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
    tagTypes: ["leaveSetup"],
    endpoints: (builder) => ({
        fetchLeaveSetup: builder.query({
            query: () => `leave-setup`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["leaveSetup"],
        }),
        
        updateLeaveSetup: builder.mutation({
            query: (data) => ({
                url: `leave-setup`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["leaveSetup"],
        }),
        
    }),
});


export const {
	useFetchLeaveSetupQuery,
	useUpdateLeaveSetupMutation
} = leaveSetupApi;

export default leaveSetupApi;