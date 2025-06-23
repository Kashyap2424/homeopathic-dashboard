// React Imports
import React, { useEffect, useState } from "react";

// React Redux Imports
import { useSelector } from "react-redux";

// React Router DOM Imports
import { Link } from "react-router-dom";

// Component Imports
import Loader from "../../../components/ui/Loader";
import LayoutCard from "../../../components/ui/Card/Layout";
import SimpleButton from "../../../components/ui/Button/SimpleButton";
import PatientCard from "../../../components/ui/Card/Patients";
import DeleteModal from "../../../components/common/DeleteModal";

// Hooks Imports
import {
  useGetProcedures,
  useDeleteProcedure,
} from "../../../hooks/procedures/useProcedures";

const EmployeesList = (props) => {
  // Props
  const { doctorId } = props;

  // States
  const [isDelete, setIsDelete] = useState(false);
  const [procedureId, setProcedureId] = useState(null);

  // Hooks
  const { users } = useSelector((state) => state.users);
  const {
    procedures,
    isProceduresLoading,
    getProceduresHandler,
    refetchProcedures,
  } = useGetProcedures();
  const { isDeleteProcedureLoading, deleteProcedureHandler } =
    useDeleteProcedure();
  useEffect(() => {
    if (doctorId) {
      getProceduresHandler(doctorId);
    } else {
      getProceduresHandler(users._id);
    }
  }, [doctorId, users._id]);

  // Handlers
  const toggleDelete = (id) => {
    setProcedureId(id);
    setIsDelete(!isDelete);
  };

  const deleteProcedure = async () => {
    const response = await deleteProcedureHandler(procedureId);
    if (response) {
      toggleDelete();
      refetchProcedures();
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
          deleteFor="Procedure"
          dltButtonName="Delete Procedure"
          isLoading={isDeleteProcedureLoading}
          customMessage="Are you sure you want to delete this procedure?"
        />
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold dark:text-gray-100">
          Patient List
        </h2>

        <div className="w-[150px]">
          <Link to={`/patients/add${doctorId ? `?doctorId=${doctorId}` : ""}`}>
            <SimpleButton type="button">Add New Patient</SimpleButton>
          </Link>
        </div>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      <div className="w-full h-full">
        {isProceduresLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="h-full w-full">
            {procedures.total > 0 ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-4">
                {procedures.data.map((item, index) => (
                  <PatientCard
                    key={index}
                    data={item}
                    toggleDelete={toggleDelete}
                  />
                ))}
              </div>
            ) : (
              <p className="h-full col-span-full flex items-center justify-center text-xl font-bold dark:text-white">
                No Patients Found
              </p>
            )}
          </div>
        )}
      </div>
    </LayoutCard>
  );
};

export default EmployeesList;
