import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const {user} = useContext(AuthContext);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    },
  });
  
  if(isLoading){
    return <Loading></Loading>
  }


  const handleMakeAdmin = id => {
   fetch(`http://localhost:5000/users/admin/${id}`, {
    method: 'PUT',
    headers: {
      authorization: `bearer ${localStorage.getItem('accessToken')}`
    }
   })
   .then(res => res.json())
   .then(data => {
    if(data?.modifiedCount > 0){
      toast.success('Make admin successful.');
      refetch()
    }
   })
  }


  return (
    <div className="overflow-x-auto">
      <h1 className="font-bold text-xl my-5">All Users: </h1>
  <table className="table w-full">
   
    <thead>
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      
     {
        users.map((user, i) =>  <tr key={i}>
            <td>{i + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {
              user?.role !== 'admin' &&   <button onClick={()=> handleMakeAdmin(user._id)} className="btn btn-primary btn-sm">Make Admin</button>
              }
            </td>
            <td>
              <button className="btn btn-sm btn-accent">Delete</button>
            </td>
            
          </tr>)
     }
      
    
    </tbody>
  </table>
</div>
  );
};

export default AllUsers;
