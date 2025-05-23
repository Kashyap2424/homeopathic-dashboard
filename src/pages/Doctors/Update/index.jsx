// React Imports
import React, { useEffect } from "react";

// React Router DOM Imports
import { Link, useNavigate, useParams } from "react-router-dom";

// React Hooks Form Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup Imports
import * as yup from "yup";

// Hooks Imports
import {
  useGetDoctorDetails,
  useUpdateDoctor,
} from "../../../hooks/admins/useAdmins";

// Component Imports
import LayoutCard from "../../../components/ui/Card/Layout";
import LoadingButton from "../../../components/ui/Button/LoadingButton";
import SimpleButton from "../../../components/ui/Button/SimpleButton";

const DoctorUpdate = (props) => {
  // Props
  const {} = props;

  // Custom Hooks
  const navigate = useNavigate();
  const { id } = useParams();
  const { isUpdateDoctorLoading, updateDoctorHandler } = useUpdateDoctor();
  const { data, isGetDoctorDetailsLoading, getDoctorDetailsHandler } =
    useGetDoctorDetails();

  // Form Validation Schema
  // Form Validation Schema
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
    is_admin: yup.bool().required(),
    payment_status: yup.mixed().required(),
  });

  // React Hook Form
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Hooks
  useEffect(() => {
    if (id) {
      getDoctorDetailsHandler(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setValue("username", data.username);
      setValue("email", data.email);
      setValue("is_admin", data.is_admin);
      setValue("payment_status", data.payment_status === true ? true : null);
    }
  }, [data]);

  // Form Submit Handler
  const onSubmit = async (data) => {
    const response = await updateDoctorHandler(id, data);
    if (response.data.status) {
      navigate("/doctors/list");
      reset();
    }
  };

  return (
    <LayoutCard className="h-full w-full p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold dark:text-gray-100">
          Update Existing Patient
        </h2>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <div className="w-full lg:w-full md:w-md mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Username
                </label>
                <input
                  type="text"
                  {...register("username")}
                  className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
                    errors.username
                      ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                      : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                  }`}
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                      : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400  ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                      : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400  ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                      : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="">
                <label
                  htmlFor="is_admin"
                  className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Is Admin
                </label>
                <select
                  {...register("is_admin")}
                  className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400  ${
                    errors.is_admin
                      ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                      : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                  }`}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.is_admin && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.is_admin.message}
                  </p>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="payment_status"
                  className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Payment Status
                </label>
                <select
                  {...register("payment_status")}
                  className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400  ${
                    errors.payment_status
                      ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                      : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                  }`}
                >
                  <option value={true}>Paid</option>
                  <option value={null}>Unpaid</option>
                </select>
                {errors.payment_status && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.payment_status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end-safe my-4">
              <div className="pr-4">
                <Link to="/doctors/list">
                  <SimpleButton type="button" theme="danger">
                    Cancel
                  </SimpleButton>
                </Link>
              </div>

              <div className="">
                <LoadingButton type="submit" isLoading={isUpdateDoctorLoading}>
                  Update Doctor
                </LoadingButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </LayoutCard>
  );
};

export default DoctorUpdate;
