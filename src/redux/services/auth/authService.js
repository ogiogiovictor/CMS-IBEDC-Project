import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        headers.set("app-secret", "daniel");
        headers.set("app-Token", "daniel");
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/v2/get_user",
        method: "GET",
      })
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: '/v2/get_dashboard_stats',
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery, useGetDashboardStatsQuery } = authApi;
