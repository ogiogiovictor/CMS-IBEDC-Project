import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const fderService = createApi({
    reducerPath: "fderService",
    baseQuery,
    endpoints: (builder) => ({
        getAllFeeder: builder.query({
            query: ({ userQuery, pageNo }) => ({
              url: `/${API_VERSION}/grap_feeder?type=${userQuery}&page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 900000, // 15 minutes
          }),

         // Create a new endpoint for the POST request
      addFeeder: builder.mutation({
        query: (requestData) => ({
          url: `/${API_VERSION}/grap_feeder`,
          method: "POST",
          body: requestData, // the data you want to send in the request body
        }),
       }),

    }),

});

export const { 
  useGetAllFeederQuery,
  useAddFeederMutation,
} = fderService;