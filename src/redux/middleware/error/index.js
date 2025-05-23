import { isRejectedWithValue } from "@reduxjs/toolkit";

// ** Third Party
import { toast } from "react-toastify";

export const ErrorHandler = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401 || action.payload.status === 403) {
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
      window.location.reload();
    }

    if (action && action.payload.data && action.payload.data.message) {
      toast.error(
        action.payload.data.message.toUpperCase() || "Something went wrong ❌"
      );
    } else {
      toast.error(action.payload.error || "Something went wrong ❌");
    }
  }

  return next(action);
};
