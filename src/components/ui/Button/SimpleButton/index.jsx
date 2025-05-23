// React Imports
import React from "react";
import PropTypes from "prop-types";

const SimpleButton = (props) => {
  const { type, theme, onClick, children, className, disabled } = props;

  if (theme === "primary") {
    return (
      <div className="w-full flex justify-center">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-violet-500 border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 cursor-pointer ${className}`}
        >
          {children}
        </button>
      </div>
    );
  } else if (theme === "secondary") {
    return (
      <div className="w-full flex justify-center">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-gray-500 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer ${className}`}
        >
          {children}
        </button>
      </div>
    );
  } else if (theme === "danger") {
    return (
      <div className="w-full flex justify-center">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer ${className}`}
        >
          {children}
        </button>
      </div>
    );
  } else if (theme === "warning") {
    return (
      <div className="w-full flex justify-center">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer ${className}`}
        >
          {children}
        </button>
      </div>
    );
  } else if (theme === "success") {
    return (
      <div className="w-full flex justify-center">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer ${className}`}
        >
          {children}
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`w-full inline-flex items-center justify-center-safe px-4 py-2 text-sm font-medium text-white bg-violet-500 border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 cursor-pointer ${className}`}
        >
          {children}
        </button>
      </div>
    );
  }
};

SimpleButton.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SimpleButton;
