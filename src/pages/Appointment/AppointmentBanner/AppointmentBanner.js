import React from "react";
import { DayPicker } from "react-day-picker";
import chair from "../../../assets/images/chair.png";

const AppointmentBanner = ({selected, setSelected}) => {
    // const [selected, setSelected] = useState(new Date());

    
    
    
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={chair}
          className="lg:max-w-xl lg:ml-10 rounded-lg shadow-2xl"
        />
        <div className="shadow-lg rounded-lg lg:mr-10 ">
          <DayPicker
           mode="single"
           selected={selected}
           onSelect={setSelected}
           
          >

          </DayPicker>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
