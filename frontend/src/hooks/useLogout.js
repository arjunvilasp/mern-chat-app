import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/authContext';
import { useChatContext } from '../context/chatContext';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const {setSelectedConversation} = useChatContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem('chat-user');
      setAuthUser(null);
      setSelectedConversation(null);
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
