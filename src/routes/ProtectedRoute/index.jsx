// React Imports
import React, { useEffect, useState } from "react";

// React Redux Imports
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../redux/slices/users";

// React Router DOM Imports
import { Navigate, useLocation } from "react-router-dom";

// Utils
import LocalStorage from "../../utils/LocalStorage";

const ProtectedRoute = ({ children }) => {
  // States
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vars
  const token = LocalStorage.get("token");
  const users = JSON.parse(LocalStorage.get("users"));

  // Hooks
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      dispatch(setToken(token));
    }

    if (Object.keys(users).length > 0) {
      setIsAuthenticated(true);
      dispatch(setUserDetails(users));
    }
  }, [token, users]);

  if (!token && !isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export const AdminProtectedRoute = ({ children }) => {
  // States
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vars
  const token = LocalStorage.get("token");
  const users = JSON.parse(LocalStorage.get("users"));

  // Hooks
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      dispatch(setToken(token));
    }

    if (Object.keys(users).length > 0) {
      setIsAuthenticated(true);
      dispatch(setUserDetails(users));
    }
  }, [token, users]);

  if (!token && !isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  } else if (!users.is_admin) {
    return (
      <Navigate to="/error/unauthorized" state={{ from: location }} replace />
    );
  } else {
    return children;
  }
};

export default ProtectedRoute;
