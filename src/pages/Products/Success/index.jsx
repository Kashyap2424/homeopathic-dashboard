// React Imports
import React, { useMemo } from "react";

// React Router DOM Imports
import { Link } from "react-router-dom";

// Custom Hooks
import { useAfterCheckout } from "../../../hooks/products/useProducts";

// Component Imports
import SimpleButton from "../../../components/ui/Button/SimpleButton";

// Images Imports
import SuccessImage from "../../../images/Success.svg";

// Utils
import LocalStorage from "../../../utils/LocalStorage";

const ProductsSuccess = (props) => {
  // Props
  const {} = props;

  // Vars
  const users = JSON.parse(LocalStorage.get("users"));

  // Custom Hooks
  const { isAfterCheckoutLoading, afterCheckoutHandler } = useAfterCheckout();

  // Hooks
  useMemo(() => {
    if (users && Object.keys(users).length > 0) {
      afterCheckoutHandler({
        is_payment_success: true,
        email: users.email,
      });
    }
  }, []);

  if (isAfterCheckoutLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center-safe text-4xl font-bold text-green-500">
      <img
        src={SuccessImage}
        alt="Success"
        className="lg:w-1/2 w-full h-auto object-cover mr-22"
      />

      <div className="w-full my-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white uppercase">
          Payment successful! 🥳
        </h1>
        <p className="pt-4 text-base font-light text-center text-gray-600 dark:text-gray-400">
          Your payment was successful. You can now proceed to the dashboard.
        </p>
      </div>

      <div className="w-full flex items-center justify-center">
        <Link to="/" className="flex items-center cursor-pointer">
          <SimpleButton theme="success" className="uppercase tracking-normal">
            Go to dashboard
          </SimpleButton>
        </Link>
      </div>
    </div>
  );
};

export default ProductsSuccess;
