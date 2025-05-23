// React Import
import React from "react";

// React Router DOM Import
import { Link } from "react-router-dom";

// Component Imports
import SimpleButton from "../../components/ui/Button/SimpleButton";

// Image Imports
import NotFoundImage from "../../images/Not-Found.svg";

const NotFound = (props) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center-safe text-4xl font-bold text-red-500">
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="lg:w-1/4 w-full h-auto object-cover"
      />

      <div className="lg:w-1/2 w-full my-8 px-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          We can't find the page you're looking for.
        </h1>
        <p className="pt-4 text-base font-light text-center text-gray-600 dark:text-gray-400">
          Page not found. It may have been moved, renamed, or temporarily
          unavailable. Please check the URL or go back home.
        </p>
      </div>

      <div className="w-full flex items-center justify-center">
        <Link to="/" className="flex items-center cursor-pointer">
          <SimpleButton>Go back home</SimpleButton>
        </Link>
      </div>
    </div>
  );
};

NotFound.propTypes = {};

export default NotFound;
