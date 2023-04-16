import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

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
        headers.set("app-secret", `${process.env.REACT_APP_API_APP_SECRET}`);
        headers.set("app-Token", `${process.env.REACT_APP_API_APP_TOKEN}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: `/${API_VERSION}/get_user`,
        method: "GET",
      })
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: `/${API_VERSION}/get_dashboard_stats`,
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery, useGetDashboardStatsQuery } = authApi;
