import React from "react";
import appointmentBg from "../../../assets/images/appointment.png";
import doctor from "../../../assets/images/doctor.png";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";

const MakeAppointment = () => {
  const makeAppointment = {
    background: `url(${appointmentBg})`,
    backgroundSize: "100% 100%",
  };

  return (
    <section style={makeAppointment}>  
      <div className="hero mt-20">
        <div className="hero-content flex-col lg:flex-row">
          <img src={doctor} className="hidden lg:block lg:w-1/2 -mt-36 " />
          <div className="">
            <h1 className="text-xl text-secondary font-bold">Appointment</h1>
            <p className=" text-3xl text-white">
              Make an appointment Today
            </p>
            <p className="text-white py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>
      </div>
      </section>
  );
};

export default MakeAppointment;
