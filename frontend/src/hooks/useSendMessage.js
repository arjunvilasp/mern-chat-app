import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useChatContext } from '../context/chatContext';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useChatContext();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`https://mern-chat-app-backend-p93r.onrender.com/api/message/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            if (res.ok) {
                setMessages(prevMessages => [...prevMessages, data]);
            } else {
                throw new Error(data.error || 'Something went wrong.');
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
