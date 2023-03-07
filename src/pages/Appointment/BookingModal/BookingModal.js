import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ treatment, selected, setTreatment, refetch }) => {

  const date = format(selected, "PP");
  const { slots, name, price } = treatment;
  const {user} = useContext(AuthContext);
  
  const handleBooking = e =>  {
    
    const form = e.target;
    const slot = form.slot.value;
    const patient = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    
    const bookingInfo = {
      appointmentDate: date,
      treatment: name,
      patient: patient,
      slot,
      email,
      phone,
      price

    }
    
    fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(bookingInfo)
    })
    .then(res => res.json())
    .then(data => {
      if(data?.acknowledged){
        toast.success('booking success')
        setTreatment(null)
        refetch()
      }
      else{
        toast.error(data.message)
        setTreatment(null)
      }
    })
    
   




    e.preventDefault()
  }
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>

          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-5 mt-10">
            <input
              type="text"
              value={date}
              disabled
              className="input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full">
              {

             slots.map((slot, index) => <option key={index} value={slot} >{slot}</option>)
             
              }
            </select>
            <input
              defaultValue={user?.email}
              disabled
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            
            <input
              defaultValue={user?.displayName}
              disabled
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            
            <input
              type="submit"
              value="book appointment"
              className="btn btn-accent w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
