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

    }),

});

export const { useGetAllFeederQuery } = fderService;