import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const ticketService = createApi({
    reducerPath: "ticketService",
    baseQuery,
    endpoints: (builder) => ({
        getAllTickets: builder.query({
            query: ({ userQuery, pageNo }) => ({
              url: `/${API_VERSION}/tickets?type=${userQuery}&page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 900000, // 15 minutes
           // cachePolicy: 'network-only', // Set cache policy to always fetch from the network
           // keepUnusedDataFor: 0,
           onError: (error, { rejectWithValue }) => {
            ///console.log("Error occurred:", error);
            return rejectWithValue({ error: "An error occurred while fetching tickets." });
            // Alternatively, you can throw an error to be caught by a higher-level error boundary
            // throw new Error("An error occurred while fetching tickets.");
          },
          
       

          }),
        

    }),

    

});


export const { useGetAllTicketsQuery } = ticketService;