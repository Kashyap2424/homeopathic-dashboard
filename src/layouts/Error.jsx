// React Import
import React from "react";

// React Router DOM Import
import { Outlet } from "react-router-dom";

// Partials Import
import Header from "../partials/Header";

const ErrorLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ErrorLayout;
