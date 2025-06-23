// React Imports
import React from "react";

// React Icons Imports
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = (props) => {
  // Props
  const { label, name, register, errors, ...rest } = props;

  // States
  const [showPassword, setShowPassword] = React.useState(false);

  // Toggle Password Visibility Handler
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Render
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
      >
        {label || "Password"}
      </label>
      <div className="relative">
        <input
          {...rest}
          {...register(name)}
          type={showPassword ? "text" : "password"}
          className={`mt-2 w-full p-2 border rounded-lg focus:outline-none text-black dark:text-white dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
            errors
              ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
              : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
          }`}
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:text-gray-700 dark:focus:text-gray-200 transition-colors duration-200"
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={0}
        >
          {showPassword ? (
            <FaEye className="w-4 h-4" />
          ) : (
            <FaEyeSlash className="w-4 h-4" />
          )}
        </button>
      </div>
      {errors && <p className="mt-2 text-xs text-red-500">{errors}</p>}
    </div>
  );
};

export default PasswordInput;
