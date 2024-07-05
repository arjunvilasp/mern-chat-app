import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/authContext.jsx';

const useLogin =  () => {
    
    const [loading, setLoading] = useState();

    const {setAuthUser}= useAuthContext();

    const login =  async ({username,password}) =>{
        const validation = validate(username,password);
        
        if(!validation){
            return
        }

        setLoading(true);
        try {
            const response = await fetch('https://mern-chat-app-backend-p93r.onrender.com/api/auth/login',{
                method:'POST',
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({username,password})
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

    return {loading,login};
}

export default useLogin;


const validate = (username,password) => {
    if(!username || !password ){
        toast.error("All the fields must be filled!")
        return false;
    }
    return true;
}
