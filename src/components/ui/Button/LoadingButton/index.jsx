// React Import
import React from "react";
import PropTypes from "prop-types";

const LoadingButton = (props) => {
  const { type, theme, isLoading, onClick, children, className, disabled } =
    props;

  let themeClass;
  switch (theme) {
    case "primary":
      themeClass =
        "w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-cyan-500 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 cursor-pointer";
      break;
    case "secondary":
      themeClass =
        "w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-gray-500 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer";
      break;
    case "danger":
      themeClass =
        "w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer";
      break;
    case "warning":
      themeClass =
        "w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer";
      break;
    case "success":
      themeClass =
        "w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer";
      break;
    default:
      themeClass =
        "w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-cyan-500 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 cursor-pointer";
      break;
  }

  return (
    <div className="w-full flex justify-center">
      <button
        type={type}
        onClick={onClick}
        disabled={isLoading || disabled}
        className={`${themeClass} ${className}`}
      >
        {isLoading ? (
          <>
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    </div>
  );
};

LoadingButton.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default LoadingButton;
