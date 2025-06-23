import React from "react";

const NormalInput = (props) => {
  // Props
  const { label, type, name, register, errors, ...rest } = props;

  // Render
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
      >
        {label || "Normal Input"}
      </label>
      <input
        {...rest}
        {...register(name)}
        type={type || "text"}
        className={`mt-2 w-full p-2 border rounded-lg focus:outline-none text-black dark:text-white dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400 ${
          errors
            ? "border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:ring-red-600"
            : "border-gray-300 focus:ring-indigo-500 dark:border-gray-700/60 dark:focus:ring-indigo-500/50"
        }`}
      />
      {errors && <p className="mt-2 text-xs text-red-500">{errors}</p>}
    </div>
  );
};

export default NormalInput;
