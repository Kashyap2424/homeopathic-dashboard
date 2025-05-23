// React Imports
import React from "react";

// React Router DOM Imports
import { Link, useNavigate } from "react-router-dom";

// React Icons Imports
import { FaUserEdit, FaRegTrashAlt } from "react-icons/fa";

// Component Imports
import Card from "..";
import SimpleButton from "../../Button/SimpleButton";

const DoctorCard = (props) => {
  // Props
  const { data, toggleDelete } = props;

  // Hooks
  const navigate = useNavigate();

  return (
    <Card className="">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold mb-2 dark:text-white">
            Doctor Information
          </h3>

          <div className="flex items-center gap-2">
            <SimpleButton
              type="button"
              theme="primary"
              onClick={() => navigate(`/doctors/update/${data._id}`)}
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

        <Link to={`/doctors/${data._id}`}>
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
        </Link>
      </div>
    </Card>
  );
};

export default DoctorCard;
