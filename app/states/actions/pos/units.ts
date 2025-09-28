import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";
import { jsonHeaders } from "../options";

const units = createApi({
    reducerPath: "posUnitsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/manage-products",
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
    tagTypes: ["PosUnits", "PosUnit"],
    endpoints: (builder) => ({
        fetchUnits: builder.query({
            query: (params) => `units?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["PosUnits"],
        }),
        createUnit: builder.mutation({
            query: (data) => ({
                url: "units",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosUnits"],
        }),
        fetchUnit: builder.query({
            query: (id) => `units/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["PosUnit"],
        }),
        updateUnit: builder.mutation({
            query: (data) => ({
                url: `units/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosUnits"],
        }),
        deleteUnit: builder.mutation({
            query: (id) => ({
                url: `units/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["PosUnits"],
        }),
    }),
});

export const {
    useFetchUnitsQuery,
    useCreateUnitMutation,
    useFetchUnitQuery,
    useUpdateUnitMutation,
    useDeleteUnitMutation,
} = units;

export default units;
