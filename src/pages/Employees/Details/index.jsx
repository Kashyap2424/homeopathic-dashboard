// React Imports
import React, { useEffect } from "react";

// React Icons Imports
import { FaVideo, FaRotateRight } from "react-icons/fa6";

// React Router DOM Imports
import { useParams, useNavigate } from "react-router-dom";

// Custom Hooks
import { useGetImages } from "../../../hooks/images/useImages";
import { useGetProcedure } from "../../../hooks/procedures/useProcedures";

// Component Imports
import Loader from "../../../components/ui/Loader";
import LayoutCard from "../../../components/ui/Card/Layout";
import SimpleButton from "../../../components/ui/Button/SimpleButton";

// Styles Imports
import "./style.css";

const WS_URL = "ws://192.168.1.5:8888";

const EmployeesDetails = (props) => {
  // Props
  const {} = props;

  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // Custom Hooks
  const {
    areas,
    data: procedures,
    isProcedureLoading,
    getProcedureHandler,
    refetchProcedure,
  } = useGetProcedure();
  const {
    data: images,
    isGetImagesLoading,
    isGetImagesFetching,
    getImagesHandler,
    refetchImages,
  } = useGetImages();

  // Hooks
  useEffect(() => {
    getProcedureHandler(id);
    getImagesHandler(id);
  }, [id]);

  return (
    <LayoutCard className="h-full w-full p-4">
      <div className="flex md:flex-row items-center justify-between md:justify-between">
        <h2 className="md:text-2xl text-md font-bold dark:text-gray-100 text-left">
          Existing Patient Details
        </h2>

        <div className="flex items-center gap-2">
          <SimpleButton
            theme="success"
            onClick={() => {
              refetchImages();
              refetchProcedure();
            }}
          >
            <FaRotateRight />{" "}
            <span className="hidden md:inline ml-2">Refresh</span>
          </SimpleButton>
          <SimpleButton
            theme="primary"
            onClick={() => navigate(`/patients/video/${id}`)}
          >
            <FaVideo /> <span className="hidden md:inline ml-2">Video</span>
          </SimpleButton>
        </div>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      {isProcedureLoading ? (
        <div className="w-full h-full flex items-center justify-center-safe">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-4">
          {Object.keys(procedures).length > 0 && (
            <div className="flex flex-col md:flex-row gap-0.5 md:gap-8 items-start-safe justify-start-safe">
              <div className="">
                <p className="font-bold text-base text-gray-700 dark:text-white">
                  Patient Name:{" "}
                  <span className="font-normal">{procedures.patient_name}</span>
                </p>
                <p className="font-bold text-base text-gray-700 dark:text-white">
                  Institution Name:{" "}
                  <span className="font-normal">
                    {procedures.institution_name}
                  </span>
                </p>
                <p className="font-bold text-base text-gray-700 dark:text-white">
                  Procedure Date:{" "}
                  <span className="font-normal">
                    {new Intl.DateTimeFormat(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(procedures.procedure_date))}
                  </span>
                </p>
              </div>
            </div>
          )}

          <div className="w-full h-full">
            {isGetImagesFetching && isGetImagesLoading ? (
              <div className="w-full h-full flex items-center justify-center-safe">
                <Loader />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {images.data
                    .filter((area) => area.display === "Default")
                    .map((area, index) => (
                      <div
                        key={index}
                        className="h-full relative p-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                      >
                        <div className="">
                          <p className="text-sm font-thin dark:text-white">
                            Original:{" "}
                            <span className="text-sm font-bold dark:text-white">
                              Image
                            </span>
                          </p>
                        </div>

                        <hr className="my-4 border-gray-200 dark:border-gray-700" />

                        <div className="h-[90%]">
                          <img
                            src={`data:image/jpeg;base64,${area.image}`}
                            alt={area.display}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  {images.data
                    .filter((area) => area.display !== "Default")
                    .map((area, index) => (
                      <div
                        key={index}
                        className="h-full relative p-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                      >
                        <div className="">
                          <p className="text-sm font-thin dark:text-white">
                            Injection Area:{" "}
                            <span className="text-sm font-bold dark:text-white">
                              {area.display}
                            </span>
                          </p>
                        </div>

                        <hr className="my-4 border-gray-200 dark:border-gray-700" />

                        <div className="h-[90%]">
                          <img
                            src={`data:image/jpeg;base64,${area.image}`}
                            alt={area.display}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </LayoutCard>
  );
};

export default EmployeesDetails;
