// React Imports
import React from "react";

// React Router DOM Imports
import { Link, useNavigate } from "react-router-dom";

// React Hooks Form Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup Imports
import * as yup from "yup";

// Context Imports
import { useAuth } from "../../context/Users";

// Hooks Imports
import { useResetPassword } from "../../hooks/users/useUsers";

// Component Imports
import LoadingButton from "../../components/ui/Button/LoadingButton";

// Images Imports
import SingIn from "../../images/sing-in.jpg";

const ForgotPassword = (props) => {
  const {} = props;

  // Auth Context
  const { login } = useAuth();
  const navigate = useNavigate();

  // Custom Hook
  const { resetPasswordHandler, isResetPasswordLoading } = useResetPassword();

  // Form Validation Schema
  const schema = yup.object().shape({
    email: yup.string().email("Please enter a valid email address").required(),
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Form Submit Handler
  const onSubmit = async (data) => {
    const response = await resetPasswordHandler(data);
    if (response) {
      navigate("/auth/signin");
    }
  };

  return (
    <div className="lg:w-lvh md:w-lvh w-full flex items-center m-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg gap-4">
      <div className="hidden lg:block md:block w-full h-[640px] rounded-lg-lt">
        {/* image here */}
        <img
          src={SingIn}
          alt="signin"
          className="w-full h-full object-cover rounded-bl-lg rounded-tl-lg"
        />
      </div>

      <div className="lg:p-8 md:p-8 p-4 w-full h-full">
        {/* sign in form here */}
        <div className="">
          <svg
            className="fill-violet-500"
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
          >
            <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
          </svg>

          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Forgot Your Password? Reset It Here!
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your email address and we will send you a link to reset your
              password.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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
            <div className="mt-6">
              <LoadingButton type="submit" isLoading={isResetPasswordLoading}>
                Reset Password
              </LoadingButton>
            </div>

            <div className="flex items-center-safe justify-between mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              <p className="mr-4 text-sm text-center text-gray-600 dark:text-gray-400">
                Remembered your password?{" "}
                <Link
                  to="/auth/signin"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
