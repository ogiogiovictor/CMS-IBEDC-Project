import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const amiService = createApi({
    reducerPath: "amiService",
    baseQuery,
    endpoints: (builder) => ({
        getAMIService: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/get_events?page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 180000, // 15 minutes
           // cacheTime: 180000, // 3 minutes
            cacheOptions: {
                // cache results for 5 minutes
                ttl: 3000000,
            },
          }),

    }),
});

export const {useGetAMIServiceQuery } = amiService;