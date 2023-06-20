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

    }),
});

export const { useGetAllMetersQuery, useAddMetersMutation } = meterService;