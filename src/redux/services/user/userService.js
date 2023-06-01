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


          registerUser: builder.mutation({
            query: (requestData) => ({
              url: `/${API_VERSION}/reg_users`,
              method: "POST",
              body: requestData,
            }),
          }),
            onError: (error) => {
              throw new Error(error)
              //console.error(error);
            },

       
     })

});

export const { useGetAllUserQuery, useRegisterUserMutation } = userService;
