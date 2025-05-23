// ** Redux Slice
import { slices } from "../../app/slice";

// ** slice for users management
const proceduresApiSlice = slices.injectEndpoints({
  endpoints: (builder) => ({
    GetAdminProcedures: builder.query({
      query: (data) => ({
        url: "/procedures",
        method: "GET",
        body: data,
      }),
    }),
    GetProcedures: builder.query({
      query: (id) => ({
        url: `/procedures/all/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),
    GetProcedure: builder.query({
      query: (id) => ({
        url: `/procedures/detail/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),
    CreateProcedure: builder.mutation({
      query: (data) => ({
        url: "/procedures/",
        method: "POST",
        body: data,
      }),
    }),
    UpdateProcedure: builder.mutation({
      query: ({ data, id }) => ({
        url: `/procedures/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    DeleteProcedure: builder.mutation({
      query: (id) => ({
        url: `/procedures/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdminProceduresQuery,
  useGetProceduresQuery,
  useGetProcedureQuery,
  useCreateProcedureMutation,
  useUpdateProcedureMutation,
  useDeleteProcedureMutation,
} = proceduresApiSlice;
