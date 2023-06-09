import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const paymentService = createApi({
    reducerPath: "paymentService",
    baseQuery,
    endpoints: (builder) => ({
        getAllPayment: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/payments?page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 900000, // 15 minutes
            providesTags: (result, error, args) => ['BillService'],
            cacheOptions: {
              // cache results for 5 minutes
              ttl: 3000000,
            },
          }),

          getPaymentInfo: builder.query({
            query: ({ FAccount, Token, CSPClientID }) => ({
              url: `/${API_VERSION}/paymentDetails/${FAccount}/${Token}/${CSPClientID}`,
              method: "GET",
            }),
            providesTags: (result, error, args) => ['BillService'],
            cacheOptions: {
              // cache results for 5 minutes
              ttl: 3000000,
            },
          }),

    }),

});

export const { useGetAllPaymentQuery, useGetPaymentInfoQuery } = paymentService;