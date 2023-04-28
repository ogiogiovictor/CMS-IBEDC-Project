import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const customerService = createApi({
  reducerPath: "customerService",
  baseQuery,
  endpoints: (builder) => ({
    getCustomerDetailsByID: builder.query({
      query: ({ id, dss }) => ({
        url: `/${API_VERSION}/get_customer_details/${id}/${dss}`,
        method: "GET",
      }),
    }),

    getCustomerDetailsByType: builder.query({
      query: ({ userQuery, pageNo }) => ({
        url: `/${API_VERSION}/grap_customers?type=${userQuery}&page=${pageNo}`,
        method: "GET",
      }),
    }),

    getCustomerInfo: builder.query({
      query: ({ FAccount, DistributionID }) => ({
        url: `/${API_VERSION}/customer360/${FAccount}/${DistributionID}`,
        method: "GET",
      }),
    }),


     // Create a new endpoint for the POST request
     postTicketID: builder.mutation({
      query: (requestData) => ({
        url: `/${API_VERSION}/tickets`,
        method: "POST",
        body: requestData, // the data you want to send in the request body
      }),
    }),

  }),
});

export const {
  useGetCustomerDetailsByIDQuery,
  useGetCustomerDetailsByTypeQuery,
  useGetCustomerInfoQuery,
  usePostTicketIDMutation 
} = customerService;
