import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);

  const {
    data: myBooking,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/booking?email=${user?.email}`,{
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
      const data = await res.json();
      return data;
    },
  });

  
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="font-bold text-xl">My Appointments: </h1>
      <table className="table w-full mt-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Treatment</th>
            <th>Date</th>
            <th>Time</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          { myBooking?.map((book, i) => (
            <tr key={book._id} className="mt-2">
              <td>{i + 1}</td>
              <td>{book.patient}</td>
              <td>{book.treatment}</td>
              <td>{book.appointmentDate}</td>
              <td>{book.slot}</td>
              <td>
              {
                book.price && !book.paid && <Link to={`/dashboard/payment/${book._id}`} className="btn btn-accent btn-sm">Pay</Link>
              }
              {
                book.price && book.paid && <button className="btn btn-accent btn-sm">Paid</button>
              }
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointment;
