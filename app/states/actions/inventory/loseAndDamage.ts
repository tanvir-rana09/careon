import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "~/constants/links";
import { jsonHeaders } from "../options";
import { RootState } from "~/states";
import Cookies from "js-cookie";

export const loseAndDamageApi = createApi({
    reducerPath: "loseAndDamageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/inventory",
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
    tagTypes: ["LoseAndDamages", "LoseAndDamage"],
    endpoints: (builder) => ({
        fetchLoseAndDamages: builder.query({
            query: (params) => `lose-and-damages?${params}`,
            transformResponse: (response: { data: any }) => response?.data,
            providesTags: ["LoseAndDamages"],
        }),
        fetchLoseAndDamage: builder.query({
            query: (id) => `lose-and-damages/${id}`,
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["LoseAndDamage"],
        }),
        createLoseAndDamage: builder.mutation({
           query: (data) => ({
                url: "lose-and-damages",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["LoseAndDamages"],
        }),
        
        updateLoseAndDamage: builder.mutation({
            query: (data) => ({
                url: `lose-and-damages/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["LoseAndDamages", "LoseAndDamage"],
        }),
        deleteLoseAndDamage: builder.mutation({
            query: (id) => ({
                url: `lose-and-damages/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["LoseAndDamages"],
        }),
        fetchChallanDetails: builder.query({
            query: (challanNo) => `sub-store/challan/${challanNo}`,
            transformResponse: (response: { data: any }) => response?.data,
        }),
       
    }),
});

export const {
    useFetchLoseAndDamagesQuery,
    useFetchLoseAndDamageQuery,
    useCreateLoseAndDamageMutation,
    useUpdateLoseAndDamageMutation,
    useDeleteLoseAndDamageMutation,
    useFetchChallanDetailsQuery,
    useLazyFetchChallanDetailsQuery,
} = loseAndDamageApi;
