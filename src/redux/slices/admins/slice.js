// ** Redux Slice
import { slices } from "../../app/slice";

// ** slice for users management
const adminsApiSlice = slices.injectEndpoints({
  endpoints: (builder) => ({
    GetDoctors: builder.query({
      query: (data) => ({
        url: `/admin/users/`,
        method: "GET",
        body: data,
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),
    GetDoctorDetails: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),
    AddDoctor: builder.mutation({
      query: (data) => ({
        url: `/admin/users/`,
        method: "POST",
        body: data,
      }),
    }),
    UpdateDoctorByAdmin: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    DeleteDoctorByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
    }),
    AddProcedure: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/users/procedures/${id}/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorDetailsQuery,
  useAddDoctorMutation,
  useUpdateDoctorByAdminMutation,
  useDeleteDoctorByAdminMutation,
  useAddProcedureMutation,
} = adminsApiSlice;
