import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 ${className} border dark:border-gray-700`}
    >
      {children}
    </div>
  );
};

export default Card;
