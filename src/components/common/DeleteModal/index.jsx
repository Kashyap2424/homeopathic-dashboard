// React Imports
import React from "react";

// React Modal
import Modal from "react-modal";

// Component Imports
import LoadingButton from "../../ui/Button/LoadingButton";
import SimpleButton from "../../ui/Button/SimpleButton";

const customStyles = {
  content: {
    background: "auto",
    height: "auto",
    width: "100%",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999999,
  },
};

const DeleteModal = (props) => {
  // Props
  const {
    isOpen,
    toggleModal,
    onDelete,
    deleteFor,
    customMessage,
    dltButtonName,
    isLoading,
  } = props;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-md"
      >
        <div id="popup-modal" className="flex justify-center items-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-medium font-normal text-gray-500 dark:text-gray-400">
                  {customMessage ||
                    `Are you sure you want to delete this ${deleteFor}?`}
                </h3>
                <div className="flex items-center-safe justify-center gap-2">
                  <div className="">
                    <LoadingButton
                      type="button"
                      isLoading={isLoading}
                      onClick={onDelete}
                      theme="danger"
                    >
                      {dltButtonName || "Yes, I'm sure"}
                    </LoadingButton>
                  </div>
                  <div className="">
                    <SimpleButton
                      theme="secondary"
                      type="button"
                      onClick={toggleModal}
                    >
                      No, cancel
                    </SimpleButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
