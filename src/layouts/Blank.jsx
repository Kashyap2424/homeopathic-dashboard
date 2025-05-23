// React Import
import React from "react";

// React Router DOM Import
import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default BlankLayout;
