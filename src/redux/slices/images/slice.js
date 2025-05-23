//  Redux Slice
import { slices } from "../../app/slice";

// Config
import config from "../../../utils/config";

//  slice for users management
const imagesApiSlice = slices.injectEndpoints({
  endpoints: (builder) => ({
    GetImages: builder.query({
      query: (id) => ({
        url: `/image/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetImagesQuery } = imagesApiSlice;
