// React Imports
import { useEffect, useState } from "react";

// Redux Imports
import {
  useGetProductsQuery,
  useProductCheckoutMutation,
  useAfterCheckoutMutation,
} from "../../redux/slices/products/slice";

// React Toast Imports
import { toast } from "react-toastify";

export const useGetProducts = () => {
  try {
    // States
    const [query, setQuery] = useState({});
    const [products, setProducts] = useState({
      data: [],
      total: 0,
    });
    const [skipApi, setSkipApi] = useState(true);

    // API call mutation & query
    const {
      data,
      isLoading,
      isError,
      error,
      refetch: refetchProducts,
    } = useGetProductsQuery(query, { skip: skipApi });

    // Hooks
    useEffect(() => {
      if (data) {
        setProducts({
          data: data.result.data,
          total: data.result.data.length,
        });
      }
    }, [data]);

    // Handlers
    const getProductsHandler = (query) => {
      setSkipApi(false);
      setQuery(query); // Reset query to fetch all products
    };

    return {
      products,
      isProductsLoading: isLoading,
      isProductsError: isError,
      productsError: error,
      getProductsHandler,
      refetchProducts,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};

export const useProductCheckout = () => {
  try {
    // API call mutation & query
    const [productCheckout, { isLoading, isError, error }] =
      useProductCheckoutMutation();

    // Handlers
    const productCheckoutHandler = async (data) => {
      return await productCheckout(data);
    };

    return {
      isProductCheckoutLoading: isLoading,
      isProductCheckoutError: isError,
      productCheckoutError: error,
      productCheckoutHandler,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};

export const useAfterCheckout = () => {
  try {
    // API call mutation & query
    const [afterCheckout, { isLoading, isError, error }] =
      useAfterCheckoutMutation();

    // Handlers
    const afterCheckoutHandler = async (data) => {
      return await afterCheckout(data);
    };

    return {
      isAfterCheckoutLoading: isLoading,
      isAfterCheckoutError: isError,
      afterCheckoutError: error,
      afterCheckoutHandler,
    };
  } catch (error) {
    toast.error(error.message);
    return {
      isLoading: false,
      isError: true,
      error: error.message,
    };
  }
};
