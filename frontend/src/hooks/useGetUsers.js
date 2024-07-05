import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useGetUsers = () => {
    const [loading, setLoading] = useState(false);
    const [conversations,setConversations] = useState([]);

    useEffect(()=>{
        const getUsers = async () => {
            setLoading(true)
            try {
                const res = await fetch('https://mern-chat-app-backend-p93r.onrender.com/api/users',{
                    method : 'GET',
                    credentials : 'include'
                });
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (error) {
                toast(error)
            }
            finally{
                setLoading(false);
            }
        }
        getUsers();
    },[]);

    return {loading,conversations}
}

export default useGetUsers
