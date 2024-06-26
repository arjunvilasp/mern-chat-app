import React, { useState } from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLogin from '../../../hooks/useLogin';

const Login = () => {

    const [inputs,setInputs] = useState({
        username : '',
        password : '',
    });

    const {loading,login} = useLogin();



    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs)
    }

  return (
    <>
    <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type='text'
             placeholder='Enter username'
             name='username'
             value={inputs.username}
             onChange={(e)=>setInputs({...inputs,username :e.target.value })}
             />
            <input type='password' 
            placeholder='Enter password' 
            name='password'
            value={inputs.password}
            onChange={(e)=>setInputs({...inputs,password :e.target.value })}
            />
            <input type='submit' value='Login'/>
        </form>
            <Link to='/register'>Don't have an account..? Register</Link>
    </div>
    <ToastContainer />
    </>
  )
}

export default Login