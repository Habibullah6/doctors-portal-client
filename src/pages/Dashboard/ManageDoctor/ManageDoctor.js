import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctor = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null)
  const { data: doctors = [], isLoading, refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/doctors`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await res.json();
      return data;
    },
  });




  if (isLoading) {
    return <Loading></Loading>
  }

  const handleDoctorDelete = (id) => {



    fetch(`http://localhost:5000/doctors/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          toast.success('doctor deleted successfully');
        }
        refetch()
      })



  }

  const closeModal = () => {
    setDeletingDoctor(null)
  }


  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold my-5">Manage Doctors</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors?.map((doctor, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <div className="avatar placeholder">
                  <div className="w-10 bg-neutral-focus text-neutral-content rounded-full">
                    <img src={doctor.image} alt="" />
                  </div>
                </div>
              </td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              {/* <td>
                <button onClick={()=> handleDoctorDelete(doctor._id)} className="btn btn-error btn-sm">Delete</button>
              </td> */}

              <td>
                <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        deletingDoctor && <ConfirmationModal

          deletingDoctor={deletingDoctor}
          title={'Are you sure you want to delete?'}
          message={`if you delete ${deletingDoctor.name} It can not be undone`}
          closeModal={closeModal}
          handleDoctorDelete={handleDoctorDelete}
        > </ConfirmationModal>
      }
    </div>
  );
};

export default ManageDoctor;
