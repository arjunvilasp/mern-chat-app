import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/authContext.jsx';

const useRegister =  () => {
    
    const [loading, setLoading] = useState();

    const {setAuthUser}= useAuthContext();

    const signup =  async ({firstName,lastName,username,email,gender,password,confirmPassword}) =>{
        const validation = validate(firstName,lastName,username,email,gender,password,confirmPassword);
        
        if(!validation){
            return
        }

        setLoading(true);
        try {
            const response = await fetch('https://mern-chat-app-backend-p93r.onrender.com/api/auth/register',{
                method:'POST',
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({firstName,lastName,username,email,gender,password,confirmPassword})
            });

            const data = await response.json();
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user',JSON.stringify(data));
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading,signup};
}

export default useRegister;


const validate = (firstName,lastName,username,email,gender,password,confirmPassword) => {
    if(!firstName || !lastName || !username || !email || !gender || !password || !confirmPassword){
        toast("All the fields must be filled!")
        return false;
    }

    if(password.length < 6){
        toast("Password must have atleast 6 characters");
        return false;
    }

    if(password != confirmPassword){
        toast("Password must be equal..!");
        return false;
    }
    return true;
}
