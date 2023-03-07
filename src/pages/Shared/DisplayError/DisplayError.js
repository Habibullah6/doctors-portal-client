import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const DisplayError = () => {
  let error = useRouteError();
  const navigate = useNavigate()
  const { logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("sign out successfully");
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="text-center mx-auto mt-5 rounded-lg shadow-xl p-10 w-1/2">
      <h1 className="my-5 text-xl text-red-500">Something went wrong</h1>
      <p className="text-red-500">{error.statusText || error.message}</p>
      <p className="my-5">
        Please <button onClick={handleLogOut} className="btn btn-error btn-sm">Logout</button> and login
        again or reload the page!
      </p>
    </div>
  );
};

export default DisplayError;
