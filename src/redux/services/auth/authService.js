import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
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
