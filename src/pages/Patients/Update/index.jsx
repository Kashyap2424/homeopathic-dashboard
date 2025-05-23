// React Imports
import React, { useEffect } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from "react-router-dom";

// React Hooks Form Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup Imports
import * as yup from "yup";

// Hooks Imports
import {
  useUpdateProcedure,
  useGetProcedure,
} from "../../../hooks/procedures/useProcedures";

// Component Imports
import Loader from "../../../components/ui/Loader";
import LayoutCard from "../../../components/ui/Card/Layout";
import LoadingButton from "../../../components/ui/Button/LoadingButton";
import SimpleButton from "../../../components/ui/Button/SimpleButton";

const PatientsUpdate = (props) => {
  // Props
  const {} = props;

  // Vars
  const injectionAreas = [
    {
      display: "Forehead Lines Botox",
      name: "forehead_lines_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Frown Lines Glabella Botox",
      name: "frown_lines_glabella_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Crows Feet Botox",
      name: "crows_feet_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Nasalis Lines Botox",
      name: "nasalis_lines_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Vertical Lip Lines Botox",
      name: "vertical_lip_lines_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Lip Flip Botox",
      name: "lip_flip_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Smile Lift Botox",
      name: "smile_lift_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Masseter Reduction Botox",
      name: "masseter_reduction_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Dimpled Chin Botox",
      name: "dimpled_chin_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Platysmal Bands Botox",
      name: "platysmal_bands_botox",
      units: 0,
      type: "botox",
    },
    {
      display: "Cheek Filler",
      name: "cheek_filler",
      units: 0,
      type: "filler",
    },
    {
      display: "Smile Line Filler",
      name: "smile_line_filler",
      units: 0,
      type: "filler",
    },
    {
      display: "Lip Filler",
      name: "lip_filler",
      units: 0,
      type: "filler",
    },
    {
      display: "Temple Filler",
      name: "temple_filler",
      units: 0,
      type: "filler",
    },
    {
      display: "Nose Filler",
      name: "nose_filler",
      units: 0,
      type: "filler",
    },
  ];

  // Custom Hooks
  const navigate = useNavigate();
  const { isUpdateProcedureLoading, updateProcedureHandler } =
    useUpdateProcedure();
  const { id } = useParams();
  const { data, isProcedureLoading, getProcedureHandler } = useGetProcedure();

  // Form Validation Schema
  const schema = yup.object().shape({
    patient_name: yup.string().required("Patient name is required"),
    institution_name: yup.string().required("Institution name is required"),
    procedure_date: yup
      .date()
      .typeError("Procedure date must be a valid date")
      .required("Procedure date is required"),
    injection_areas: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string(),
          units: yup.number(),
        })
      )
      .nullable(),
    patient_age: yup
      .number()
      .typeError("Age must be a number")
      .positive()
      .integer()
      .required("Age is required"),
    patient_gender: yup
      .string()
      .required("Gender is required")
      .oneOf(["male", "female", "other"], "Invalid gender"),
    patient_notes: yup.string(),
  });

  // React Hook Form
  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      injection_areas: injectionAreas,
    },
  });

  // Hooks
  useEffect(() => {
    if (id) {
      getProcedureHandler(id);
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setValue("patient_name", data.patient_name);
      setValue("institution_name", data.institution_name);
      setValue(
        "procedure_date",
        new Date(data.procedure_date).toISOString().split("T")[0]
      );
      const areas = JSON.parse(data.injection_areas);
      areas.forEach((area, index) => {
        setValue(`injection_areas.${index}.selected`, area.selected);
        setValue(`injection_areas.${index}.name`, area.name);
        setValue(`injection_areas.${index}.units`, area.units);
      });
      setValue("patient_age", data.patient_age);
      setValue("patient_gender", data.patient_gender);
      setValue("patient_notes", data.patient_notes);
    }
  }, [data]);

  // Form Submit Handler
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "procedure_date") {
        formData.append(key, data[key].toISOString());
      } else if (key === "injection_areas") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });

    const response = await updateProcedureHandler(id, formData);
    if (response.data.status) {
      reset();
      navigate("/patients/list");
    }
  };

  const handleResetValuesOfInjectionAreasUnits = (index) => {
    setValue(`injection_areas.${index}.units`, 0);
  };

  return (
    <LayoutCard className="h-full w-full p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold dark:text-gray-100">
          Update Existing Patient
        </h2>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      {isProcedureLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full lg:w-full md:w-md mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-4">
              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="patient_name"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Patient Name
                  </label>
                  <input
                    type="text"
                    {...register("patient_name")}
                    className={`mt-2 p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
                      errors.patient_name
                        ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                        : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                    }`}
                    placeholder="Enter patient name"
                  />
                  {errors.patient_name && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.patient_name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="institution_name"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Institution Name
                  </label>
                  <input
                    type="text"
                    {...register("institution_name")}
                    className={`mt-2 p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
                      errors.institution_name
                        ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                        : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                    }`}
                    placeholder="Enter institution name"
                  />
                  {errors.institution_name && (
                    <span className="text-xs text-red-500">
                      {errors.institution_name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="procedure_date"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Procedure Date
                  </label>
                  <input
                    type="date"
                    {...register("procedure_date")}
                    className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
                      errors.procedure_date
                        ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                        : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                    }`}
                  />
                  {errors.procedure_date && (
                    <span className="text-xs text-red-500">
                      {errors.procedure_date.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="patient_age"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Patient Age
                  </label>
                  <input
                    type="number"
                    {...register("patient_age")}
                    className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
                      errors.patient_age
                        ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                        : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                    }`}
                    placeholder="Enter patient age"
                  />
                  {errors.patient_age && (
                    <span className="text-xs text-red-500">
                      {errors.patient_age.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label
                  htmlFor="patient_gender"
                  className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  Patient Gender
                </label>
                <select
                  {...register("patient_gender")}
                  className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
                    errors.patient_gender
                      ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                      : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.patient_gender && (
                  <span className="text-xs text-red-500">
                    {errors.patient_gender.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Injection Areas
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {watch("injection_areas").map((area, index) => (
                    <div key={index} className="flex flex-col items-start">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          {...register(`injection_areas.${index}.selected`)}
                          className={`w-4 h-4 border rounded-lg focus:outline-none dark:bg-gray-700/50 ${
                            errors.injection_areas?.[index]?.selected
                              ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                              : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                          }`}
                        />
                        <span className="ml-2 text-sm text-gray-800 dark:text-gray-300">
                          {area.display}
                        </span>
                      </div>

                      {watch(`injection_areas.${index}.selected`) ? (
                        <div className={`w-1/2`}>
                          <div className="flex flex-col items-start">
                            <input
                              type="number"
                              {...register(`injection_areas.${index}.units`, {
                                required: true,
                                min: 0.1,
                                valueAsNumber: true,
                              })}
                              max={100}
                              step={0.1}
                              className={`w-full mt-2 p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 ${
                                errors.injection_areas?.[index]?.units
                                  ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                                  : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                              }`}
                              placeholder="Units"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleResetValuesOfInjectionAreasUnits(index)
                              }
                              className="mt-1 text-xs text-blue-500 hover:underline"
                            >
                              Reset Units
                            </button>
                            {errors.injection_areas?.[index]?.units && (
                              <span className="mt-1 text-xs text-red-500">
                                {errors.injection_areas[index].units?.message}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                {errors.injection_areas && (
                  <span className="text-xs text-red-500">
                    {errors.injection_areas.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="block text-sm text-gray-800 dark:text-gray-300">
                  Patient Notes
                </label>
                <textarea
                  {...register("patient_notes")}
                  className={`mt-2 w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
                    errors.patient_notes
                      ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
                      : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
                  }`}
                  placeholder="Enter your notes"
                />
                {errors.notes && (
                  <span className="text-xs text-red-500">
                    {errors.patient_notes.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end-safe my-4">
                <div className="pr-4">
                  <SimpleButton type="button" theme="danger">
                    Cancel
                  </SimpleButton>
                </div>

                <div className="">
                  <LoadingButton
                    type="submit"
                    isLoading={isUpdateProcedureLoading}
                  >
                    Update Patient
                  </LoadingButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </LayoutCard>
  );
};

export default PatientsUpdate;
