// React Imports
import { useEffect, useState } from "react";

// Redux Imports
import {
  useGetDoctorsQuery,
  useGetDoctorDetailsQuery,
  useAddDoctorMutation,
  useUpdateDoctorByAdminMutation,
  useDeleteDoctorByAdminMutation,
  useAddProcedureMutation,
} from "../../redux/slices/admins/slice";

// React Toast Imports
import { toast } from "react-toastify";

export const useGetDoctors = () => {
  try {
    // States
    const [query, setQuery] = useState({});
    const [doctors, setDoctors] = useState({
      data: [],
      total: 0,
    });
    const [skipApi, setSkipApi] = useState(true);

    // API call mutation & query
    const {
      data,
      isLoading,
      isError,
      error,
      refetch: refetchDoctors,
    } = useGetDoctorsQuery(query, { skip: skipApi });

    // Hooks
    useEffect(() => {
      if (data) {
        setDoctors({
          data: data.result.data,
          total: data.result.data.length,
        });
      }
    }, [data]);

    // Handlers
    const getDoctorsHandler = (query) => {
      setSkipApi(false);
      setQuery(query); // Reset query to fetch all doctors
    };

    return {
      doctors,
      isDoctorsLoading: isLoading,
      isDoctorsError: isError,
      doctorsError: error,
      getDoctorsHandler,
      refetchDoctors,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};

export const useGetDoctorDetails = () => {
  try {
    // States
    const [id, setId] = useState("");
    const [skipApi, setSkipApi] = useState(true);
    const [data, setData] = useState({});

    // API call mutation & query
    const {
      data: doctor,
      isLoading,
      isError,
      error,
    } = useGetDoctorDetailsQuery(id, { skip: skipApi });

    // Hooks
    useEffect(() => {
      if (doctor) {
        setData(doctor.result);
        setSkipApi(true);
      }
    }, [doctor]);

    // Handlers
    const getDoctorDetailsHandler = (id) => {
      setSkipApi(false);
      setId(id);
    };

    return {
      data,
      isGetDoctorDetailsLoading: isLoading,
      isGetDoctorDetailsError: isError,
      getDoctorDetailsError: error,
      getDoctorDetailsHandler,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};

export const useAddDoctor = () => {
  try {
    // API call mutation & query
    const [addDoctor, { isLoading, isError, error }] = useAddDoctorMutation();

    // Handlers
    const addDoctorHandler = async (data) => {
      return await addDoctor(data);
    };

    return {
      isAddDoctorLoading: isLoading,
      isAddDoctorError: isError,
      addDoctorError: error,
      addDoctorHandler,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};

export const useUpdateDoctor = () => {
  try {
    // API call mutation & query
    const [updateDoctor, { isLoading, isError, error }] =
      useUpdateDoctorByAdminMutation();

    // Handlers
    const updateDoctorHandler = async (id, data) => {
      return await updateDoctor({ id, data });
    };

    return {
      isUpdateDoctorLoading: isLoading,
      isUpdateDoctorError: isError,
      updateDoctorError: error,
      updateDoctorHandler,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};

export const useDeleteDoctor = () => {
  try {
    // API call mutation & query
    const [deleteDoctor, { isLoading, isError, error }] =
      useDeleteDoctorByAdminMutation();

    // Handlers
    const deleteDoctorHandler = async (data) => {
      return await deleteDoctor(data);
    };

    return {
      isDeleteDoctorLoading: isLoading,
      isDeleteDoctorError: isError,
      deleteDoctorError: error,
      deleteDoctorHandler,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};

export const useAddProcedureByAdmin = () => {
  try {
    // API call mutation & query
    const [addProcedure, { isLoading, isError, error }] =
      useAddProcedureMutation();

    // Handlers
    const addProcedureHandler = async (id, data) => {
      return await addProcedure({ id, data });
    };

    return {
      isAddProcedureLoading: isLoading,
      isAddProcedureError: isError,
      addProcedureError: error,
      addProcedureHandler,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};
