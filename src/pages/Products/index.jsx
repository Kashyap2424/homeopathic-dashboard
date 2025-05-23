// React Imports
import React, { useEffect } from "react";

// Custom Hooks Imports
import {
  useGetProducts,
  useProductCheckout,
} from "../../hooks/products/useProducts";

// Component Imports
import LoadingButton from "../../components/ui/Button/LoadingButton";

// Utils Imports
import LocalStorage from "../../utils/LocalStorage";

const Products = (props) => {
  // Props
  const {} = props;

  // Vars
  const users = JSON.parse(LocalStorage.get("users"));

  // Custom Hooks
  const { isProductCheckoutLoading, productCheckoutHandler } =
    useProductCheckout();
  const { products, isProductsLoading, getProductsHandler } = useGetProducts();

  // Hooks
  useEffect(() => {
    getProductsHandler();
  }, []);

  // Handlers
  const checkoutHandler = async (data) => {
    const requestPayload = {
      email: users.email,
      price_id: data.price_id,
      quantity: 1,
      success_url: "https://juneplex.com/auth/stripe/products/success",
      cancel_url: "https://juneplex.com/auth/stripe/products/cancel",
    };
    const response = await productCheckoutHandler(requestPayload);
    if (response.data.success) {
      // Assuming the URL is in response.data.url
      if (response.data.result.checkout_url.checkout_url) {
        window.location.href = response.data.result.checkout_url.checkout_url;
      } else {
        console.error("URL not found in response data");
      }
    }
  };

  // Render
  if (isProductsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full py-8">
      <div className="card-container">
        <div className="w-full flex justify-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Our Products & Plans
          </h1>
        </div>

        <div className="max-w-[80%] grid md:grid-cols-3 grid-cols-1 gap-4 mx-auto">
          {products.total &&
            products.data.map((product, index) => (
              <div
                key={index}
                className="p-6 w-full h-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                {/* Product Name */}
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {index === 0
                    ? "Monthly Plan"
                    : index === 1
                    ? "Semi-Annual Plan"
                    : "Yearly Plan"}
                </h3>

                {/* Product Price */}
                <p className="flex text-7xl font-bold text-gray-800 dark:text-white mt-8 mb-6">
                  {index === 0 ? 50 : index === 1 ? 250 : 450}{" "}
                  <span className="mb-3 ml-2 text-2xl font-medium uppercase safe-end content-end">
                    $
                  </span>
                </p>

                {/* Product Description */}
                <div className="md:h-[250px] h-fit md:mb-0 mb-8">
                  {index === 0 ? (
                    <ul className="list-disc ml-6 text-sm font-normal text-gray-800 dark:text-white">
                      <li>
                        The Monthly Plan for Memberpicks Services is designed
                        for those who prefer flexibility and short-term
                        commitments.
                      </li>
                      <li>
                        At $50 USD per month, this plan is perfect for users who
                        want to explore our services without any long-term
                        obligations.
                      </li>
                      <li>
                        It renews automatically each month, ensuring continuous
                        access, and can be canceled at any time, providing the
                        freedom to manage your subscription as needed.
                      </li>
                    </ul>
                  ) : index === 1 ? (
                    <ul className="list-disc ml-6 text-sm font-normal text-gray-800 dark:text-white">
                      <li>
                        Our Semi-Annual Plan offers a balanced approach to
                        savings and flexibility.
                      </li>
                      <li>
                        Priced at $250 USD for six months, this plan is ideal
                        for users who want to commit to a longer period while
                        still enjoying significant savings.
                      </li>
                      <li>
                        Compared to the monthly plan, you save $50 over the same
                        duration, making it a cost-effective choice for those
                        looking to get more value from their subscription.
                      </li>
                    </ul>
                  ) : (
                    <ul className="list-disc ml-6 text-sm font-normal text-gray-800 dark:text-white">
                      <li>
                        The Yearly Plan is tailored for committed users seeking
                        the best value for their investment.
                      </li>
                      <li>
                        Priced at $450 USD per year, this plan provides
                        substantial savings.
                      </li>
                      <li>
                        Saves $150 compared to the monthly plan over a year.
                      </li>
                      <li>
                        Billed annually, ensuring uninterrupted access to all
                        Memberpicks services.
                      </li>
                      <li>
                        Offers the most economical option for long-term users
                        who want to maximize their benefits.
                      </li>
                    </ul>
                  )}
                </div>

                {/* Product Button */}
                <div className="w-full flex items-center justify-center">
                  <LoadingButton
                    onClick={() => checkoutHandler(product)}
                    isLoading={isProductCheckoutLoading}
                  >
                    Get Started
                  </LoadingButton>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
