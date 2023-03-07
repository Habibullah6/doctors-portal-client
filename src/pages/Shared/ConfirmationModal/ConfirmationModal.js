import React from "react";

const ConfirmationModal = ({ title, message, closeModal, deletingDoctor, handleDoctorDelete }) => {



  return (
    <>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => handleDoctorDelete(deletingDoctor?._id)}
              htmlFor="confirmation-modal"
              className="btn btn-error"
            >
              Done
            </label>

            <label
              onClick={closeModal}
              htmlFor="confirmation-modal"
              className="btn btn-secondary"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
