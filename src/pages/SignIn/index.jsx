// React Imports
import React from "react";

// React Router DOM Imports
import { useNavigate } from "react-router-dom";

// React Hooks Form Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Redux Imports
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../redux/slices/users";

// Yup Imports
import * as yup from "yup";

// Context Imports
import { useAuth } from "../../context/Users";

// Hooks Imports
import { useSignIn } from "../../hooks/users/useUsers";

// Component Imports
import NormalInput from "../../components/ui/Input/NormalInput";
import PasswordInput from "../../components/ui/Input/PasswordInput";
import LoadingButton from "../../components/ui/Button/LoadingButton";

// Images Imports
import SingIn from "../../images/sing-in.jpg";
import Logo from "../../images/Logo.jpg";

const Signin = (props) => {
  const {} = props;

  // Auth Context
  const navigate = useNavigate();

  // Hooks
  const dispatch = useDispatch();

  // Custom Hook
  const { signInHandler, isSingInLoading } = useSignIn();

  // Form Validation Schema
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
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
    const response = await signInHandler(data);
    if (response.data.success) {
      dispatch(setToken(response.data.result.access_token));
      dispatch(setUserDetails(response.data.result));
      navigate("/patients/list");
    }
  };

  return (
    <div className="lg:w-5/6 md:w-3/4 w-full flex items-center m-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg gap-4">
      <div className="hidden lg:block md:block w-full h-[640px] rounded-lg-lt">
        {/* image here */}
        <img
          src={SingIn}
          alt="signin"
          className="w-full h-full object-cover rounded-bl-lg rounded-tl-lg"
        />
      </div>

      <div className="lg:p-8 md:p-8 p-4 w-full h-full flex flex-col justify-center">
        {/* sign in form here */}
        <div className="">
          <img
            className="w-20 h-20 rounded-full"
            src={Logo}
            alt="Manthan-Logo"
          />

          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Hey, Welcome Back! 👋🏻
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account to continue.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <NormalInput
                label="Email"
                type="email"
                name="email"
                register={register}
                errors={errors.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4">
              <PasswordInput
                name="password"
                register={register}
                errors={errors.password}
                placeholder="Enter your password"
              />
            </div>
            <div className="mt-6">
              <LoadingButton type="submit" isLoading={isSingInLoading}>
                Sign In
              </LoadingButton>
            </div>
          </form>

          {/* 
             - CLIENT DOES NOT REQUIRE THIS PART OF CODE 
          */}
          {/* <div className="flex items-center-safe justify-between mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            <p className="mr-4 text-sm text-center text-gray-600 dark:text-gray-400">
              Don&apos;t have an account yet?{" "}
              <Link
                to="/auth/signup"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Sign Up
              </Link>
            </p>

            <Link
              to="/auth/forgot-password"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signin;
