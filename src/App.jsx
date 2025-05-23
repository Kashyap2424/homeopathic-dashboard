// React Imports
import React, { useEffect } from "react";

// React Router Imports
import { useLocation } from "react-router-dom";

// Context Imports
import { useThemeProvider } from "./utils/ThemeContext";

// Theme Imports
import "./css/style.css";

// Chart Imports
import "./charts/ChartjsConfig";

// Page Imports
import AppRoutes from "./routes";

// React toastify Import
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const { currentTheme } = useThemeProvider();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      <AppRoutes />

      <ToastContainer
        theme={currentTheme}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
