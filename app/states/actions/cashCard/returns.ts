import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const cashCardReturns = createApi({
    reducerPath: "cashCardReturnsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/cash-card",
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
    tagTypes: ["cashCardReturns", "cashCardReturn"],
    endpoints: (builder) => ({
        fetchCardReturns: builder.query({
            query: (params) => `refund?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["cashCardReturns"],
        }),
        createCardReturn: builder.mutation({
            query: (data) => ({
                url: "refund",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardReturns"],
        }),
        fetchCardReturn: builder.query({
            query: (id) => `refund/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["cashCardReturn"],
        }),
        updateCardReturn: builder.mutation({
            query: (data) => ({
                url: `refund/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardReturns"],
        }),
        deleteCardReturn: builder.mutation({
            query: (id) => ({
                url: `refund/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["cashCardReturns"],
        }),
    }),
});

export const {
    useFetchCardReturnsQuery,
    useCreateCardReturnMutation,
    useFetchCardReturnQuery,
    useUpdateCardReturnMutation,
    useDeleteCardReturnMutation,
} = cashCardReturns;

export default cashCardReturns;
