// React Imports
import React from "react";

// React Router DOM Imports
import { useNavigate, useSearchParams } from "react-router-dom";

// React Hooks Form Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup Imports
import * as yup from "yup";

// Hooks Imports

// Component Imports
import LayoutCard from "../../../components/ui/Card/Layout";
import LoadingButton from "../../../components/ui/Button/LoadingButton";
import SimpleButton from "../../../components/ui/Button/SimpleButton";
import NormalInput from "../../../components/ui/Input/NormalInput";
import PasswordInput from "../../../components/ui/Input/PasswordInput";

const EmployeesAdd = (props) => {
  // Props
  const {} = props;

  // Params
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  // Custom Hooks
  const navigate = useNavigate();

  // Form Validation Schema
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: yup.string().required("Role is required"),
    associateDoctor: yup.string().when("role", {
      is: (role) => role === "doctor",
      then: yup.string().required("Associate Doctor is required"),
      otherwise: yup.string().notRequired(),
    }),
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
    console.log("Form Data:", data);
  };

  return (
    <LayoutCard className="h-full w-full p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold dark:text-gray-100">
          Add New Employees
        </h2>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <div className="w-full lg:w-full md:w-md mt-4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-4">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <NormalInput
                  label="Username"
                  type="text"
                  name="username"
                  register={register}
                  placeholder="Enter username"
                  errors={errors.username}
                />
              </div>

              <div className="flex flex-col gap-2">
                <PasswordInput
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                  placeholder="Enter password"
                  errors={errors.password}
                />
              </div>
            </div>

            <div className="flex items-center justify-end-safe my-4">
              <div className="pr-4">
                <SimpleButton type="button" theme="danger">
                  Cancel
                </SimpleButton>
              </div>

              <div className="">
                <LoadingButton type="submit" isLoading={false}>
                  Add Employee
                </LoadingButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </LayoutCard>
  );
};

export default EmployeesAdd;
