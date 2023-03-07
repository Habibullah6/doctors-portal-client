import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import DropzoneComponent from "../../Shared/DropzoneComponent/DropzoneComponent";
import Loading from "../../Shared/Loading/Loading";


const AddDoctor = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
   
  
 
  const onSubmit = (data) => {
   
   
    const image = files[0];
    
    const formData = new FormData();
    formData.append('file', image );
    formData.append('upload_preset',  'doctorsportalapp');
    formData.append('cloud_name', 'dj2wtwwkw');
    
    const url = 'https://api.cloudinary.com/v1_1/dj2wtwwkw/image/upload'
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData => {
      
      if(imgData?.url){
        const doctorInfo = {
          name: data.name,
          email: data.email,
          specialty: data.specialty,
          image: imgData?.url
        }
    
      const url = 'http://localhost:5000/doctors';
      fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(doctorInfo)
      })
      .then(res => res.json())
      .then(data => {
        if(data.acknowledged){
          toast.success(`${doctorInfo.name} added successfully`);
          navigate('/dashboard')
        }
      })
      }
    })

    reset()
  };


  const {
    data: appointmentSpecialty = [],
    isLoading,
    
  } = useQuery({
    queryKey: ['appointmentSpecialty'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/appointmentSpecialty`);
      const data = await res.json();
      return data;
    },
  });
  
  



  
  if(isLoading){
    return <Loading></Loading>
  }

 

  return (
    <div>
      <h1 className="font-bold text-lg my-5">Add A New Doctor</h1>
      <div className="w-96 p-5 shadow-xl bg-white rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />

            <label className="label">
              {errors && (
                <span className="text-red-500">{errors?.name?.message}</span>
              )}
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />

            <label className="label">
              {errors && (
                <span className="text-red-500">{errors?.email?.message}</span>
              )}
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">Specialty</label>
            <select
              {...register("specialty")}
              className="select select-bordered w-full">
                {
                  appointmentSpecialty.map(specialty => <option key={specialty._id}>{specialty.name}</option>)
                }
            </select>
          </div>

         

<div className="form-control w-full mt-5">
            <DropzoneComponent files={files} setFiles={setFiles}></DropzoneComponent>
          </div>

          <input
            type="submit"
            defaultValue="Add Doctor"
            className="btn btn-accent w-full mt-5"
          />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
