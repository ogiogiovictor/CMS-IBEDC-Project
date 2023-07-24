import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const meterService = createApi({
    reducerPath: "amiService",
    baseQuery,
    endpoints: (builder) => ({
        getAllMeters: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/get_meter?page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 1800000, // 15 minutes
            cacheTime: 1800000, // 3 minutes
            cacheOptions: {
                // cache results for 5 minutes
                ttl: 3000000,
            },
          }),


          addMeters: builder.mutation({
            query: (requestData) => ({
              url: `/${API_VERSION}/add_meter`,
              method: "POST",
              body: requestData, // the data you want to send in the request body
            }),
          }),

          getEventsLoop: builder.query({
            query: ({ userQuery, pageNo }) => ({
              url: `/${API_VERSION}/events?type=${userQuery}&page=${pageNo}`,
              method: "GET",
            }),
            cacheOptions: {
                // cache results for 5 minutes
                ttl: 3000000,
            },
          }),



          pushCAAD: builder.mutation({
            query: (requestData) => ({
              url: `/${API_VERSION}/process_caad_request`,
              method: "POST",
              body: requestData, // the data you want to send in the request body
            }),
          }),


          uploadBULKCAAD: builder.mutation({
            query: (requestData) => ({
              url: `/${API_VERSION}/upload_bulk_caad`,
              method: "POST",
              body: requestData, // the data you want to send in the request body
            }),
          }),


          getSingleCAAD: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/allcaad?page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 1800000, // 15 minutes
            cacheTime: 1800000, // 3 minutes
            cacheOptions: {
                // cache results for 5 minutes
                ttl: 3000000,
            },
          }),


          getMytoFeeders: builder.query({
            query: ({ userQuery, pageNo }) => ({
              url: `/${API_VERSION}/all_feeders_with_myto?type=${userQuery}&page=${pageNo}`,
              method: "GET",
            }),
            cacheOptions: {
                // cache results for 5 minutes
                ttl: 3000000,
            },
          }),


          getMonthlySummary: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/get_ami_summary?page=${pageNo}`,
              method: "GET",
            }),
            cacheOptions: {
                // cache results for 5 minutes
                ttl: 3000000,
            },
          }),




    }),
});

export const { useGetMonthlySummaryQuery, useGetAllMetersQuery, useAddMetersMutation, useGetEventsLoopQuery, usePushCAADMutation, useUploadBULKCAADMutation, useGetSingleCAADQuery, useGetMytoFeedersQuery } = meterService;