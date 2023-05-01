import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const ticketService = createApi({
    reducerPath: "ticketService",
    baseQuery,
    endpoints: (builder) => ({
        getAllTickets: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/tickets`,
              method: "GET",
            }),
            pollingInterval: 900000, // 15 minutes
          }),

    }),

    

});


export const { useGetAllTicketsQuery } = ticketService;