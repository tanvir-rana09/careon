import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const bonusApi = createApi({
    reducerPath: "bonusApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/payroll",
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
    tagTypes: ["Bonuses", "Bonus"],
    endpoints: (builder) => ({
        fetchBonuses: builder.query({
            query: (params) => `bonuses?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["Bonuses"],
        }),
        createBonus: builder.mutation({
            query: (data) => ({
                url: "bonuses",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Bonuses"],
        }),
        fetchBonus: builder.query({
            query: (id) => `bonuses/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["Bonus"],
        }),
        updateBonus: builder.mutation({
            query: (data) => ({
                url: `bonuses/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Bonuses", "Bonus"],
        }),
        deleteBonus: builder.mutation({
            query: (id) => ({
                url: `bonuses/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["Bonuses"],
        }),
        
    }),
});

export const {
    useFetchBonusesQuery,
    useCreateBonusMutation,
    useFetchBonusQuery,
    useUpdateBonusMutation,
    useDeleteBonusMutation,
} = bonusApi;

export default bonusApi;