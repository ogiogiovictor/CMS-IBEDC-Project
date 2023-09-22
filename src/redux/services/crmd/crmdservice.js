import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const crmdService = createApi({
    reducerPath: "crmdService",
    baseQuery,
    endpoints: (builder) => ({

        getNewlyCapturedCustomer: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/get_crmd_customers?page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 1800000, // 15 minutes
            cacheTime: 1800000, // 3 minutes
            cacheOptions: {
                // cache results for 5 minutes
                ttl: 3000000,
            },
          }),

          pushCRMDCustomer: builder.mutation({
            query: (requestData) => ({
              url: `/${API_VERSION}/crmd_store`,
              method: "POST",
              body: requestData, // the data you want to send in the request body
            }),
          }),


          getPendingApproval: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/get_crmd_pending?page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 1800000, // 15 minutes
            cacheTime: 1800000, // 3 minutes
            cacheOptions: {
                // cache results for 5 minutes
                ttl: 3000000,
            },
          }),




    }) // End of endpint

}); // end 


export const { useGetNewlyCapturedCustomerQuery, useGetPendingApprovalQuery, usePushCRMDCustomerMutation  } = crmdService;