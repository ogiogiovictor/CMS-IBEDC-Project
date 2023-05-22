import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../utils/baseHeader";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;

export const userService = createApi({
    reducerPath: "userService",
    baseQuery,
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: ({ pageNo }) => ({
              url: `/${API_VERSION}/all_users?page=${pageNo}`,
              method: "GET",
            }),
            pollingInterval: 900000, // 15 minutes
          }),

       
     })

});

export const { useGetAllUserQuery } = userService;