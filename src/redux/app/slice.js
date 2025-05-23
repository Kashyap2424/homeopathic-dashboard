// ** Redux imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ** Config
import config from "../../utils/config";

export const slices = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().users.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});
