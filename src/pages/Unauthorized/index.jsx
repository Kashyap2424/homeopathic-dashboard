// React Import
import React from "react";

// React Router DOM Import
import { Link } from "react-router-dom";

// Component Imports
import SimpleButton from "../../components/ui/Button/SimpleButton";

// Images Imports
import AccessDenied from "../../images/AccessDenied.svg";

const Unauthorized = (props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center-safe items-center-safe gap-16">
      <div className="w-1/5">
        <img src={AccessDenied} alt="Access Denied" className="w-full h-full" />
      </div>

      <div className="w-1/5">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Access Denied
        </h1>
        <p className="pt-4 text-base font-light text-center text-gray-600 dark:text-gray-400">
          You are not authorized to access this page.
        </p>

        <div className="w-full flex items-center justify-center mt-8">
          <Link to="/" className="flex items-center cursor-pointer">
            <SimpleButton>Go back home</SimpleButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

Unauthorized.propTypes = {};

export default Unauthorized;
