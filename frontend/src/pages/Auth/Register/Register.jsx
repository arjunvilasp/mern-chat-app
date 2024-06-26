import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRegister from "../../../hooks/useRegister";

const Register = () => {

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender:"",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup}  = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs)
  };

  return (
    <>
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Enter firstname" name="fname"
        value={inputs.firstName}
        onChange={(e)=>setInputs({...inputs,firstName : e.target.value})}
        />
        <input type="text" placeholder="Enter lastname" name="lname" 
        value={inputs.lastName}
        onChange={(e)=>setInputs({...inputs,lastName : e.target.value})}
        />
        <input type="text" placeholder="Enter username" name="username" 
        value={inputs.username}
        onChange={(e)=>setInputs({...inputs,username : e.target.value})}
        />
        <input type="email" placeholder="Enter email" name="email" 
        value={inputs.email}
        onChange={(e)=>setInputs({...inputs,email : e.target.value})}
        />
        <div className="gender">
          <label htmlFor="gender">Gender:</label>
          <div className="field">
            <input type="radio" name="gender" 
             checked = {inputs.gender == 'male'}
            onChange={(e)=>setInputs({...inputs,gender : 'male'})}
            />
            <label htmlFor="gender">Male</label>
          </div>
          <div className="field">
            <input type="radio" name="gender"
            checked = {inputs.gender == 'female'}
            onChange={(e)=>setInputs({...inputs,gender : 'female'})}
            />
            <label htmlFor="gender">Female</label>
          </div>
        </div>
        <input type="password" placeholder="Enter password" name="password" 
        value={inputs.password}
        onChange={(e)=>setInputs({...inputs,password :e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="cpassword"
          value={inputs.confirmPassword}
            onChange={(e)=>setInputs({...inputs,confirmPassword :e.target.value })}
        />
        <input type="submit" value="Register" />
      </form>
      <Link to="/login">Already have an account..? Login</Link>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Register;
