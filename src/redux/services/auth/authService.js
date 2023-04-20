
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";
import baseQuery from "../../../utils/baseHeader";
import { notify } from "../../../utils/notify";
const { logout } = require("../../auth/authSlice");

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: `/${API_VERSION}/get_user`,
        method: "GET",
      }),
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: `/${API_VERSION}/get_dashboard_stats`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery } = authApi;

export const useGetUserDetailsQuery = () => {
  const dispatch = useDispatch();
  const { data, error, isFetching, isSuccess, isError, refetch } =
    authApi.endpoints.getUserDetails.useQuery();

  // Handle any exceptions that may occur
  if (error) {
    try {
      // Log the error to the console or send it to a logging service
      console.error("An error occurred while fetching user details:", error);
      notify("error", error?.data?.message || "An error occured");
      error?.status === 401 && dispatch(logout());
      error?.status === "FETCH_ERROR" && notify("error", error?.error);
    } catch (err) {
      // Handle any exceptions that may occur while logging the error
      console.error("An error occurred while handling the error:", err);
    }
  }

  return { data, error, isFetching, isSuccess, isError, refetch };
};
