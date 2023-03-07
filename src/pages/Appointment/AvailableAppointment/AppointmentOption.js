import React from "react";
const AppointmentOption = ({ service, setTreatment }) => {
  const { name, slots, price } = service;
  return (
    <div className="card  bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-center text-secondary font-bold text-xl">{name}</h2>
        <p className="text-center">
          {slots.length > 0 ? slots[0] : "Try another day"}
        </p>
        <p className="text-center">
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <p className="text-center">Price: ${price}</p>
        <div className="flex justify-center">
          <label
            disabled={slots.length === 0}
            onClick={() => setTreatment(service)}
            htmlFor="booking-modal"
            className="btn btn-secondary"
          >
            book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
