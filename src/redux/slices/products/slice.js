// ** Redux Slice
import { slices } from "../../app/slice";

// ** slice for users management
const proceduresApiSlice = slices.injectEndpoints({
  endpoints: (builder) => ({
    GetProducts: builder.query({
      query: (data) => ({
        url: "/stripe/stripe/products",
        method: "GET",
      }),
    }),
    ProductCheckout: builder.mutation({
      query: (data) => ({
        url: "/stripe/stripe/checkout",
        method: "POST",
        body: data,
      }),
    }),
    AfterCheckout: builder.mutation({
      query: (data) => ({
        url: "/stripe/stripe/after-payment",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useProductCheckoutMutation,
  useAfterCheckoutMutation,
} = proceduresApiSlice;
