import React from "react";
import bg from "../../../assets/images/appointment.png";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";


const Contact = () => {

  
  const contactStyle = {
    background: `url(${bg})`,
    backgroundSize: "100% 100%",
  };


  return (
    <div style={contactStyle} className='mt-20'>
      <div className="flex flex-col items-center p-16">
        <div className="mb-7">
          <h1 className="text-center text-secondary font-bold text-xl">
            Contact Us
          </h1>
          <h1 className="text-center text-white text-3xl">
            Stay connected with us
          </h1>
        </div>
        <input
          type="text"
          placeholder="Email Address"
          className="input input-bordered w-full max-w-md mb-5"
        />
        <input
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full max-w-md mb-5"
        />
        <textarea
          className="textarea textarea-bordered w-full max-w-md mb-5"
          placeholder="Your Message"
        ></textarea>

        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </div>
  );
};

export default Contact;
