// React Import
import React from "react";

// React Router DOM Import
import { Routes, Route, Navigate } from "react-router-dom";

// Context Import
import { AuthProvider } from "../context/Users";

// Layout Import
import MainLayout from "../layouts/Main";
import AuthLayout from "../layouts/Auth";
import ErrorLayout from "../layouts/Error";
import BlankLayout from "../layouts/Blank";

// Pages Import
import SignIn from "../pages/SignIn";
import SignUp from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import PatientsList from "../pages/Patients/List";
import PatientsAdd from "../pages/Patients/Add";
import PatientsUpdate from "../pages/Patients/Update";
import PatientDetails from "../pages/Patients/Details";
import Products from "../pages/Products";
import ProductsSuccess from "../pages/Products/Success";
import ProductsCancel from "../pages/Products/Cancel";
import DoctorDetails from "../pages/Doctors/Details";
import DoctorList from "../pages/Doctors/List";
import DoctorUpdate from "../pages/Doctors/Update";
import DoctorAdd from "../pages/Doctors/Add";
import VideoStream from "../pages/Patients/Video";

// Protected Route Import
import ProtectedRoute, { AdminProtectedRoute } from "./ProtectedRoute";

// Local Storage Import
import LocalStorage from "../utils/LocalStorage";

const ProtectedRoutes = [
  {
    path: "/patients",
    children: [
      {
        path: "list",
        element: <PatientsList />,
      },
      {
        path: "add",
        element: <PatientsAdd />,
      },
      {
        path: "update/:id",
        element: <PatientsUpdate />,
      },
      {
        path: ":id",
        element: <PatientDetails />,
      },
      {
        path: "video/:id",
        element: <VideoStream />,
      },
    ],
  },
  {
    path: "/doctors",
    children: [
      {
        path: "list",
        element: (
          <AdminProtectedRoute>
            <DoctorList />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "add",
        element: (
          <AdminProtectedRoute>
            <DoctorAdd />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <AdminProtectedRoute>
            <DoctorUpdate />
          </AdminProtectedRoute>
        ),
      },
      {
        path: ":id",
        element: (
          <AdminProtectedRoute>
            <DoctorDetails />
          </AdminProtectedRoute>
        ),
      },
    ],
  },
];

const AuthRoutes = [
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/stripe/products",
    element: <Products />,
  },
  {
    path: "/auth/stripe/products/success",
    element: <ProductsSuccess />,
  },
  {
    path: "/auth/stripe/products/cancel",
    element: <ProductsCancel />,
  },
];

const ErrorRoutes = [
  {
    path: "/error/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/error/not-found",
    element: <NotFound />,
  },
];

const BlankRoutes = [
  // Add any blank layout routes here
];

const AppRoutes = () => {
  // Vars
  const token = LocalStorage.get("token");
  const users = JSON.parse(LocalStorage.get("users"));

  return (
    <AuthProvider>
      <Routes>
        {/* Protected Routes */}
        <Route element={<MainLayout />}>
          {ProtectedRoutes.map(({ path, element: Component, children }) => {
            if (children) {
              return (
                <Route key={path} path={path}>
                  {children.map(({ path: childPath, element: Child }) => (
                    <Route
                      key={childPath}
                      path={childPath}
                      element={<ProtectedRoute>{Child}</ProtectedRoute>}
                    />
                  ))}
                </Route>
              );
            }

            return (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute>{Component}</ProtectedRoute>}
              />
            );
          })}
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          {AuthRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Route>

        {/* Error Routes */}
        <Route element={<ErrorLayout />}>
          {ErrorRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Route>

        {/* Blank Routes */}
        <Route element={<BlankLayout />}>
          {BlankRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Route>

        {/* Fallback Route */}
        {token && users.is_admin ? (
          <Route path="/" element={<Navigate to="/doctors/list" />} />
        ) : token && !users.is_admin ? (
          <Route path="/" element={<Navigate to="/patients/list" />} />
        ) : (
          <Route path="/" element={<Navigate to="/auth/signin" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
