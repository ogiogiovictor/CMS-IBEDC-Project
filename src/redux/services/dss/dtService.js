import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const dtService = createApi({
    reducerPath: "dtService",
    baseQuery,
    endpoints: (builder) => ({
        getAllDistribution: builder.query({
            query: ({ userQuery, pageNo }) => ({
              url: `/${API_VERSION}/grap_asset?type=${userQuery}&page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 900000, // 15 minutes
            cacheOptions: {
              // cache results for 5 minutes
              ttl: 3000000,
            },
          }),

          getDSSInfo: builder.query({
            query: ({ Assetid }) => ({
              url: `/${API_VERSION}/assetDetails/${Assetid}`,
              method: "GET",
            }),
          }),

          // Create a new endpoint for the POST request
        searchAssetDT: builder.mutation({
          query: (requestData) => ({
            url: `/${API_VERSION}/search_any`,
            method: "POST",
            body: requestData, // the data you want to send in the request body
          }),
        }),


        // Create a new endpoint for the POST request
        exportAssetDT: builder.mutation({
          query: (requestData) => ({
            url: `/${API_VERSION}/export_dt`,
            method: "POST",
            body: requestData, // the data you want to send in the request body
          }),
        }),

        getBillingEfficency: builder.query({
          query: ({ pageNo }) => ({
            url: `/${API_VERSION}/dt_billing_efficency`,
            method: "GET",
          }),
        }),


        

    }),
});


export const { useGetBillingEfficencyQuery, useGetAllDistributionQuery, useGetDSSInfoQuery, useSearchAssetDTMutation, useExportAssetDTMutation } = dtService;