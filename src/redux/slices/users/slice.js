// ** Redux Slice
import { slices } from "../../app/slice";

// ** slice for users management
const usersApiSlice = slices.injectEndpoints({
  endpoints: (builder) => ({
    SignUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    SignIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    ResetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    UpdateUser: builder.mutation({
      query: (data) => ({
        url: "/auth/edit",
        method: "PUT",
        body: data,
      }),
    }),
    GetUserDetails: builder.query({
      query: () => ({
        url: "/auth/user/details",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = usersApiSlice;
