// React Imports
import React from "react";

// React Router DOM Imports
import { Navigate, useLocation } from "react-router-dom";

// Utils
import LocalStorage from "../../utils/LocalStorage";

const UnprotectedRoute = ({ children }) => {
  // Vars
  const token = LocalStorage.get("token");
  const users = LocalStorage.get("users");

  // Hooks
  const location = useLocation();

  if (token && Object.keys(users).length > 0) {
    return <Navigate to="/patients/list" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default UnprotectedRoute;
