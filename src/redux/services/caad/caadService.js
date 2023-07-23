import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

 export const caadService = createApi({
    reducerPath: "caadService",
    baseQuery,
    endpoints: (builder) => ({
          getAllCAAD: builder.query({
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

          approveCAAD: builder.mutation({
            query: (requestData) => ({
              url: `/${API_VERSION}/caad_approval_request`,
              method: "POST",
              body: requestData, // the data you want to send in the request body
            }),
          }),

          rejectCAAD: builder.mutation({
            query: (requestData) => ({
              url: `/${API_VERSION}/caad_reject_request`,
              method: "POST",
              body: requestData, // the data you want to send in the request body
            }),
          }),

    }),
});


export const { useGetAllCAADQuery, useApproveCAADMutation, useRejectCAADMutation } = caadService;
