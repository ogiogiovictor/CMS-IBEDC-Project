import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("app-secret", `${process.env.REACT_APP_API_APP_SECRET}`);
      headers.set("app-Token", `${process.env.REACT_APP_API_APP_TOKEN}`);
      return headers;
    }
  },
});

export default baseQuery;
