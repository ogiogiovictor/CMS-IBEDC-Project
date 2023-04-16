import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const customerService = createApi({
  reducerPath: "customerService",
  baseQuery,
  endpoints: (builder) => ({
    getCustomerDetailsByID: builder.query({
      query: ({id, dss}) => ({
        url: `/${API_VERSION}/get_customer_details/${id}/${dss}`,
        method: "GET",
      })
    }),
   
  }),
});

export const { useGetCustomerDetailsByIDQuery } = customerService;
