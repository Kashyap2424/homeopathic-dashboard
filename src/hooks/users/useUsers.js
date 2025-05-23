// React Imports
import { useState, useEffect } from "react";

// Redux Imports
import {
  useSignInMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useGetUserDetailsQuery,
} from "../../redux/slices/users/slice";

// React Toast Imports
import { toast } from "react-toastify";

export const useSignIn = () => {
  try {
    // API call mutation & query
    const [singIn, { isLoading, isError, error }] = useSignInMutation();

    // Handlers
    const signInHandler = async (data) => {
      return await singIn(data);
    };

    return {
      isSingInLoading: isLoading,
      isSingInError: isError,
      singInError: error,
      signInHandler,
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

export const useSignUp = () => {
  try {
    // API call mutation & query
    const [singUp, { isLoading, isError, error }] = useSignUpMutation();

    // Handlers
    const signUpHandler = async (data) => {
      return await singUp(data);
    };

    return {
      isSingUpLoading: isLoading,
      isSingUpError: isError,
      singUpError: error,
      signUpHandler,
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

export const useUpdateUser = () => {
  try {
    // API call mutation & query
    const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

    // Handlers
    const updateUserHandler = async (data) => {
      return await updateUser(data);
    };

    return {
      isUpdateUserLoading: isLoading,
      isUpdateUserError: isError,
      updateUserError: error,
      updateUserHandler,
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

export const useResetPassword = () => {
  try {
    // API call mutation & query
    const [resetPassword, { isLoading, isError, error }] =
      useResetPasswordMutation();

    // Handlers
    const resetPasswordHandler = async (data) => {
      return await resetPassword(data);
    };

    return {
      isResetPasswordLoading: isLoading,
      isResetPasswordError: isError,
      resetPasswordError: error,
      resetPasswordHandler,
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

export const useGetUserDetails = () => {
  try {
    // States
    const [skipApi, setSkipApi] = useState(true);
    const [data, setData] = useState({});

    // API call mutation & query
    const {
      data: userData,
      isLoading,
      isError,
      error,
    } = useGetUserDetailsQuery(null, { skip: skipApi });

    // Hooks
    useEffect(() => {
      if (userData) {
        setData(userData);
        setSkipApi(true);
      }
    }, [userData]);

    // Handlers
    const getUserDetailsHandler = () => {
      setSkipApi(false);
    };

    return {
      data,
      isGetUserDetailsLoading: isLoading,
      isGetUserDetailsError: isError,
      getUserDetailsError: error,
      getUserDetailsHandler,
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
