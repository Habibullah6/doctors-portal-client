import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useToken from "../../../hooks/useToken";

const SignUp = () => {

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('')
  
  const [token] = useToken(userEmail);

  if(token){
    navigate('/')
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("user created successfully");
        const userInfo = {
          displayName: data?.name,
        };

        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, "POST");
          })
          .catch((err) => console.log(err));
      })

      .catch((error) => {
        console.log(error.message);
      });
    reset();
  };

  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        saveUser(user?.displayName, user?.email, "PUT");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const saveUser = (name, email, method) => {
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.acknowledged){
          setUserEmail(email)
        }
      });
  };

  
  



  return (
    <div className="h-[600px] flex justify-center items-center">
      <div className="w-96 shadow-xl p-5 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-xl">Sign Up</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <label className="label">
              {errors.name && (
                <p className="text-red-500">{errors?.name?.message}</p>
              )}
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            <label className="label">
              {errors.email && (
                <p className="text-red-500">{errors?.email?.message}</p>
              )}
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "the password should be 8 characters or longer",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                  message:
                    "the password should be at least one uppercase letter, one lowercase letter, one number, and one special character, and that the password is at least 8 characters long:",
                },
              })}
            />
            <label className="label">
              {errors.password && (
                <p className="text-red-500">{errors?.password?.message}</p>
              )}
            </label>
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="btn btn-accent w-full"
          />
        </form>
        <p className="text-center">
          Already have an account ?{" "}
          <Link to="/login" className="text-secondary">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogIn} className="btn btn-outline w-full">
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
