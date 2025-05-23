// React Imports
import React from "react";

// Component Imports
import Card from "../index";

const LayoutCard = ({ children, className }) => {
  return <Card className={className}>{children}</Card>;
};

export default LayoutCard;
