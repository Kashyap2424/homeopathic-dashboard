// React Imports
import React from "react";

// React Router DOM Imports
import { Link, useNavigate } from "react-router-dom";

// React Icons Imports
import { FaUserEdit, FaRegTrashAlt } from "react-icons/fa";

// Component Imports
import Card from "..";
import SimpleButton from "../../Button/SimpleButton";

const PatientCard = (props) => {
  // Props
  const { data, toggleDelete } = props;

  // Hooks
  const navigate = useNavigate();

  const getInjectionArea = () => {
    if (data.injection_areas) {
      const parsed = JSON.parse(data.injection_areas);

      return parsed.map((item, index) => {
        return (
          <>
            {item.selected ? (
              <div key={index}>
                <p className="mb-1 dark:text-white text-base font-medium">
                  {item.display} -{" "}
                  <span className="text-sm font-normal">
                    Units: {item.units}
                  </span>
                </p>
              </div>
            ) : null}
          </>
        );
      });
    }
  };

  return (
    <Card className="">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold dark:text-white">
            Patient Information
          </h3>

          <div className="flex items-center gap-2">
            <SimpleButton
              type="button"
              theme="primary"
              onClick={() => navigate(`/patients/update/${data._id}`)}
            >
              <FaUserEdit />
            </SimpleButton>
            <SimpleButton
              type="button"
              theme="danger"
              onClick={() => toggleDelete(data._id)}
            >
              <FaRegTrashAlt />
            </SimpleButton>
          </div>
        </div>

        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        <Link to={`/patients/${data._id}`}>
          <p className="mb-1 dark:text-white text-base">
            <strong>Patient Name:</strong> {data.patient_name}
          </p>
          <p className="mb-1 dark:text-white text-base">
            <strong>Institution Name:</strong> {data.institution_name}
          </p>
          <p className="mb-1 dark:text-white text-base">
            <strong>Procedure Date:</strong>{" "}
            {new Intl.DateTimeFormat(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(data.procedure_date))}
          </p>
          <h4 className="mb-1 dark:text-white text-base font-bold">
            Injection Areas:
          </h4>
          {getInjectionArea()}
        </Link>
      </div>
    </Card>
  );
};

export default PatientCard;
