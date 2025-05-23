// React Imports
import { useEffect, useState } from "react";

// Redux Imports
import { useGetImagesQuery } from "../../redux/slices/images/slice";

// React Toast Imports
import { toast } from "react-toastify";

export const useGetImages = () => {
  try {
    // States
    const [id, setId] = useState("");
    const [data, setData] = useState({
      data: [],
      total: 0,
    });
    const [skipApi, setSkipApi] = useState(true);

    // API call mutation & query
    const {
      data: images,
      isLoading,
      isError,
      error,
      refetch,
      isFetching,
    } = useGetImagesQuery(id, { skip: skipApi });

    // Hooks
    useEffect(() => {
      if (images) {
        setData({
          data: images.result.data,
          total: images.result.data.length,
        });
      }
    }, [images]);

    // Handlers
    const getImagesHandler = (id) => {
      setId(id);
      setSkipApi(false);
    };

    return {
      data,
      isGetImagesLoading: isLoading,
      isGetImagesFetching: isFetching,
      isGetImagesError: isError,
      getImagesError: error,
      getImagesHandler,
      refetchImages: refetch,
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
