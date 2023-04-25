import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const transmisionService = createApi({
    reducerPath: "transmissionService",
    baseQuery,
    endpoints: (builder) => ({
        getTransmission: builder.query({
            query: () => ({
              url: `/${API_VERSION}/transmission_stations`,
              method: "GET",
            }),
            pollingInterval: 900000, // 15 minutes
          }),

    }),
});


export const { useGetTransmissionQuery } = transmisionService;