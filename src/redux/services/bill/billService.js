import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

 export const billService = createApi({
    reducerPath: "billService",
    baseQuery,
    endpoints: (builder) => ({
        getAllBills: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/getbills`,
              method: "GET",
            }),
            pollingInterval: 900000, // 15 minutes
          }),

    }),
});


export const { useGetAllBillsQuery } = billService;
