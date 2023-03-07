import { format } from "date-fns";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointment = ({ selected }) => {
  // const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const date = (format(selected, 'PP'))
  // useEffect(() => {
  //     fetch('http://localhost:5000/appointmentOptions')
  //     .then(res => res.json())
  //     .then(data => {
  //         setServices(data)
  //     })
  // }, );

  const { data: appointmentOptions = [], isLoading , refetch} = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <h1 className="text-secondary font-bold text-center text-xl">
        Available Services on {format(selected, "PPP")}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
        {appointmentOptions.map((service) => (
          <AppointmentOption
            key={service._id}
            service={service}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          selected={selected}
          refetch={refetch}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointment;
