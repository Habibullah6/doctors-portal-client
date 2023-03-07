import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useToken from "../../../hooks/useToken";

const Login = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [loginError, setLoginError] = useState('');
  
  const {signIn, signInWithGoogle} = useContext(AuthContext);
  
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/";
   
  const [userEmail, setUserEmail] = useState('')
  const [token] = useToken(userEmail)
  
  if(token){
    navigate(from , {replace: true})
  }

  const onSubmit = (data) => {
    signIn(data.email, data.password)
    .then(result => {
      const user = result.user
      setUserEmail(user?.email)
      toast.success(`${user?.displayName} welcome back again`)
      
    })
    .catch(error => {
      setLoginError(error.message)
    })
    reset()
  };
  

  const handleGoogleLogIn = () => {
    signInWithGoogle()
    .then(result => {
      const user = result.user;
      console.log(user);
      saveUser(user.displayName, user.email, 'PUT')
    
    })
    .catch(err => {
      console.log(err.message);
    })
  }


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
    <section className="mx-5 h-[600px] flex justify-center items-center">
      <div className="shadow-xl p-5 w-96 rounded-lg">
        <h1 className="text-center text-2xl mb-5">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full"
            />

            <label className="label">
            {errors.email && <p className="text-red-500">{errors?.email?.message}</p>}


            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", { 
                required: "Password is required",
                minLength: {value: 6, message: 'password must be six character or longer'}
             })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
               <span className="label-text">Forget Password?</span>
            <label className="label">
           
              {errors.password && <p className="text-red-500">{errors?.password?.message}</p>}
            </label>
          </div>
          <div>
            {loginError && <p className="text-red-500">{loginError}</p>}
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-accent w-full"
          />
        </form>

        <p className="text-center">
          New to doctors portal?{" "}
          <Link to="/signUp" className="text-secondary">Create New Account</Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogIn} className="btn btn-outline w-full">Continue With Google</button>
      </div>
    </section>
  );
};

export default Login;
