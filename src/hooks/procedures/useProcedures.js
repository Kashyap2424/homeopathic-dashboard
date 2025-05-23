// React Imports
import { useState, useEffect } from "react";

// Redux Imports
import {
  useGetProceduresQuery,
  useGetProcedureQuery,
  useCreateProcedureMutation,
  useUpdateProcedureMutation,
  useDeleteProcedureMutation,
} from "../../redux/slices/procedures/slice";

// React Toast Imports
import { toast } from "react-toastify";

export const useGetProcedures = () => {
  try {
    // States
    const [query, setQuery] = useState({});
    const [procedures, setProcedures] = useState({
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
      refetch: refetchProcedures,
    } = useGetProceduresQuery(query, { skip: skipApi });

    // Hooks
    useEffect(() => {
      if (data) {
        setProcedures({
          data: data.result.data,
          total: data.result.data.length,
        });
      }
    }, [data]);

    // Handlers
    const getProceduresHandler = (query) => {
      setSkipApi(false);
      setQuery(query); // Reset query to fetch all procedures
    };

    return {
      procedures,
      isProceduresLoading: isLoading,
      isProceduresError: isError,
      proceduresError: error,
      getProceduresHandler,
      refetchProcedures,
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

export const useGetProcedure = () => {
  try {
    // States
    const [id, setId] = useState("");
    const [skipApi, setSkipApi] = useState(true);
    const [data, setData] = useState({});
    const [areas, setAreas] = useState([]);

    // API call mutation & query
    const {
      data: procedure,
      isLoading,
      isError,
      error,
      refetch,
    } = useGetProcedureQuery(id, {
      skip: skipApi,
    });

    // Hooks
    useEffect(() => {
      if (procedure) {
        setData(procedure.result);
        const parsed = JSON.parse(procedure.result.injection_areas);
        setAreas(parsed);
      }
    }, [procedure]);

    // Handlers
    const getProcedureHandler = (id) => {
      setId(id);
      setSkipApi(false);
    };

    return {
      data,
      areas,
      isProcedureLoading: isLoading,
      isProcedureError: isError,
      procedureError: error,
      getProcedureHandler,
      refetchProcedure: refetch,
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

export const useCreateProcedure = () => {
  try {
    // API call mutation & query
    const [createProcedure, { isLoading, isError, error }] =
      useCreateProcedureMutation();

    // Handlers
    const createProcedureHandler = async (data) => {
      return await createProcedure(data);
    };

    return {
      isCreateProcedureLoading: isLoading,
      isCreateProcedureError: isError,
      createProcedureError: error,
      createProcedureHandler,
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

export const useUpdateProcedure = () => {
  try {
    // API call mutation & query
    const [updateProcedure, { isLoading, isError, error }] =
      useUpdateProcedureMutation();

    // Handlers
    const updateProcedureHandler = async (id, data) => {
      return await updateProcedure({ id, data });
    };

    return {
      isUpdateProcedureLoading: isLoading,
      isUpdateProcedureError: isError,
      updateProcedureError: error,
      updateProcedureHandler,
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

export const useDeleteProcedure = () => {
  try {
    // API call mutation & query
    const [deleteProcedure, { isLoading, isError, error }] =
      useDeleteProcedureMutation();

    // Handlers
    const deleteProcedureHandler = async (id) => {
      return await deleteProcedure(id);
    };

    return {
      isDeleteProcedureLoading: isLoading,
      isDeleteProcedureError: isError,
      deleteProcedureError: error,
      deleteProcedureHandler,
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
