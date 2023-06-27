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
      query: ({ userQuery, userStatus, pageNo }) => ({
       // url: `/${API_VERSION}/grap_customers?type=${userQuery}&page=${pageNo}`,
        url: `/${API_VERSION}/grap_customers?type=${userQuery}&status=${userStatus}&page=${pageNo}`,
        method: "GET",
      }),
      pollingInterval: 180000, // 15 minutes
      cacheTime: 180000, // 3 minutes
    }),

    getCustomerInfo: builder.query({
      query: ({ FAccount, DistributionID, AccountType, MeterNo }) => ({
        url: `/${API_VERSION}/customer360/${FAccount}/${DistributionID}/${AccountType}/${MeterNo}`,
        method: "GET",
      }),
    }),


    //GET PENDING CRMD CUSTOMERS DETAILS
    getCRMDCustomer: builder.query({
      query: ({ pageNo}) => ({
        url: `/${API_VERSION}/get_crmd/pending`,
        method: "GET",
      }),
      pollingInterval: 900000, // 15 minutes
    }),


     // Create a new endpoint for the POST request
     postTicketID: builder.mutation({
      query: (requestData) => ({
        url: `/${API_VERSION}/tickets`,
        method: "POST",
        body: requestData, // the data you want to send in the request body
      }),
    }),

    // Create a new endpoint for the POST request for CRMD
    postCRMD: builder.mutation({
      query: (requestData) => ({
        url: `/${API_VERSION}/crmd`,
        method: "POST",
        body: requestData, // the data you want to send in the request body
      }),
    }),

   // Approve CRMD By Business Hub Manager
   postUpdateCRMD: builder.mutation({
    query: ({ id, status, userid }) => ({
      url: `/${API_VERSION}/updatecrmdstate`,
      method: "POST",
      body: {
        id,
        status,
        userid
      },
    }),
  }),
    onError: (error) => {
      console.error(error);
    },


    getSearchCustomerPostpaid: builder.query({
      query: ({ status, type,pageNo }) => ({
        url: `/${API_VERSION}/grap_customers_status/${status}/${type}&page=${pageNo}`,
        method: "GET",
      }),
      pollingInterval: 900000, // 15 minutes
      cacheTime: 180000, // 3 minutes
    }),


    // Create a new endpoint for the POST request for CRMD
    addNewCustomer: builder.mutation({
      query: (requestData) => ({
        url: `/${API_VERSION}/add_customer`,
        method: "POST",
        body: requestData, // the data you want to send in the request body
      }),
    }),


    //GET PENDING CRMD CUSTOMERS DETAILS
    getNewCustomers: builder.query({
      query: () => ({
        url: `/${API_VERSION}/pending_customer_validation`,
        method: "GET",
      }),
      pollingInterval: 900000, // 15 minutes
    }),


     // Approve Newly Created Customers
     postUpdateNewlyCreated: builder.mutation({
    query: ({ id, status, userid }) => ({
      url: `/${API_VERSION}/updatenewlycreated`,
      method: "POST",
      body: {
        id,
        status,
        userid
      },
    }),
  }),
    onError: (error) => {
      console.error(error);
    },



    getCustomerByRegion: builder.query({
      query: ({ region }) => ({
        url: `/${API_VERSION}/customer_all_region/${region}`,
        method: "GET",
      }),
    }),


    getNstsCustomers: builder.query({
      query: () => ({
        url: `/${API_VERSION}/get_nsts_customers`,
        method: "GET",
      }),
    }),



  }),

 

});

export const {
  useGetNstsCustomersQuery,
  useGetCustomerByRegionQuery,
  useGetCustomerDetailsByIDQuery,
  useGetCustomerDetailsByTypeQuery,
  useGetCustomerInfoQuery,
  usePostTicketIDMutation,
  usePostCRMDMutation,
  useGetCRMDCustomerQuery,
  usePostUpdateCRMDMutation,
  useGetSearchCustomerPostpaidQuery,
  useAddNewCustomerMutation,
  useGetNewCustomersQuery,
  usePostUpdateNewlyCreatedMutation,
} = customerService;
