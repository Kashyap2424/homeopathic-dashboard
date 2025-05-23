// React Imports
import React, { useEffect } from "react";

// React Router DOM Imports
import { useParams } from "react-router-dom";

// Custom Hooks
import { useGetDoctorDetails } from "../../../hooks/admins/useAdmins";

// Component Imports
import PatientsList from "../../Patients/List";
import LayoutCard from "../../../components/ui/Card/Layout";
import Loader from "../../../components/ui/Loader";

// Styles Imports
import "./style.css";

const DoctorDetails = (props) => {
  // Props
  const {} = props;

  // Params
  const { id } = useParams();

  // Custom Hooks
  const { data, getDoctorDetailsHandler, isGetDoctorDetailsLoading } =
    useGetDoctorDetails();

  // Hooks
  useEffect(() => {
    getDoctorDetailsHandler(id);
  }, []);

  // Render
  if (isGetDoctorDetailsLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <LayoutCard className="w-full p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between">
          <h2 className="text-2xl font-semibold dark:text-gray-100 text-left">
            Existing Doctor Details
          </h2>
        </div>

        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        <div className="mt-6">
          {Object.keys(data).length > 0 && (
            <>
              <p className="mb-2 dark:text-white text-base">
                <strong>Doctor Name:</strong> {data.username}
              </p>
              <p className="mb-2 dark:text-white text-base">
                <strong>Doctor Email:</strong> {data.email}
              </p>
              <p className="mb-2 dark:text-white text-base">
                <strong>Registration Date:</strong>{" "}
                {new Intl.DateTimeFormat(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(data.created_at))}
              </p>
              <p className="mb-2 dark:text-white text-base">
                <strong>Payment Status:</strong>{" "}
                {data.payment_status === null
                  ? "Not Paid"
                  : data.payment_status
                  ? "Paid"
                  : "Not Paid"}
              </p>
            </>
          )}
        </div>
      </LayoutCard>

      <div className="my-6">
        <PatientsList doctorId={id} />
      </div>
    </>
  );
};

export default DoctorDetails;
