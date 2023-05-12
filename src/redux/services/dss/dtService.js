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

    }),
});

export const { useGetAllDistributionQuery, useGetDSSInfoQuery } = dtService;