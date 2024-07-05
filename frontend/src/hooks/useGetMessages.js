import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useChatContext } from '../context/chatContext';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useChatContext();

    useEffect(()=>{
        const getMessages = async (message) => {
            setLoading(true);
            try {
                const res = await fetch(`https://mern-chat-app-backend-p93r.onrender.com/api/message/${selectedConversation._id}`);
    
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error || 'Something went wrong.');
                }
                setMessages(data);
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false);
            }
        }
        getMessages();
    },[selectedConversation?._id,setMessages])

    return { loading, messages };
};

export default useGetMessages;
