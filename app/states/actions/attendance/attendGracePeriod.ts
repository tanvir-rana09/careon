import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

export const attendGracePeriodApi = createApi({
    reducerPath: "attendGracePeriodApi",
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
    endpoints: (builder) => ({
        getGracePeriod: builder.query({
            query: () => "grace-period",
            transformResponse: (response: { data: any }) => response?.data,
        }),
        updateGracePeriod: builder.mutation({
            query: (data) => ({
                url: "grace-period",
                method: "PATCH",
                body: JSON.stringify(data),
            }),
        }),
    }),
});

export const {
    useGetGracePeriodQuery,
    useUpdateGracePeriodMutation,
} = attendGracePeriodApi;