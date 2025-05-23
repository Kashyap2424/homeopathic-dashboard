// React Imports
import React, { useEffect, useState } from "react";

// React Router DOM Imports
import { Link } from "react-router-dom";

// Component Imports
import LayoutCard from "../../../components/ui/Card/Layout";
import DoctorCard from "../../../components/ui/Card/Doctors";
import DeleteModal from "../../../components/common/DeleteModal";
import SimpleButton from "../../../components/ui/Button/SimpleButton";
import Loader from "../../../components/ui/Loader";

// Hooks Imports
import {
  useDeleteDoctor,
  useGetDoctors,
} from "../../../hooks/admins/useAdmins";

const DoctorList = (props) => {
  // Props
  const {} = props;

  // States
  const [isDelete, setIsDelete] = useState(false);
  const [doctorId, setDoctorId] = useState(null);

  // Hooks
  const { doctors, isDoctorsLoading, getDoctorsHandler, refetchDoctors } =
    useGetDoctors();
  const { isDeleteDoctorLoading, deleteDoctorHandler } = useDeleteDoctor();
  useEffect(() => {
    getDoctorsHandler();
  }, []);

  // Handlers
  const toggleDelete = (id) => {
    setDoctorId(id);
    setIsDelete(!isDelete);
  };

  const deleteProcedure = async () => {
    const response = await deleteDoctorHandler(doctorId);
    if (response) {
      toggleDelete();
      refetchDoctors();
    }
  };

  return (
    <LayoutCard className="h-full w-full p-4">
      {isDelete && (
        <DeleteModal
          openModal={setIsDelete}
          isOpen={isDelete}
          toggleModal={toggleDelete}
          onDelete={() => deleteProcedure()}
          deleteFor="Doctor"
          dltButtonName="Delete Doctor"
          customMessage="Are you sure you want to delete this Doctor?"
        />
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold dark:text-gray-100">
          Doctors List
        </h2>

        <div className="w-[150px]">
          <Link to="/doctors/add">
            <SimpleButton type="button">Add New Doctor</SimpleButton>
          </Link>
        </div>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      {isDoctorsLoading ? (
        <div className="w-full h-full flex items-center justify-center-safe">
          <Loader />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {doctors.data.map((item, index) => (
            <DoctorCard key={index} data={item} toggleDelete={toggleDelete} />
          ))}
        </div>
      )}
    </LayoutCard>
  );
};

export default DoctorList;
