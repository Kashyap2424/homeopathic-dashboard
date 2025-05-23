// ** Redux toolkit
import { isFulfilled } from "@reduxjs/toolkit";

// ** Third Party
import { toast } from "react-toastify";

export const SuccessHandler = (api) => (next) => (action) => {
  if (isFulfilled(action)) {
    if (
      (action && action.payload && action.payload.result) ||
      (action && action.payload && action.payload)
    ) {
      toast.success(action.payload.message || "Success");
    } else {
      toast.success("Success");
    }
  }

  return next(action);
};
