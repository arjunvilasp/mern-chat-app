import React, { useEffect, useRef } from 'react';
import './Conversations.css';
import Message from '../Message/Message';
import { useChatContext } from '../../context/chatContext';
import useGetMessages from '../../hooks/useGetMessages';
import Loader from '../Loader/Loader';
import useListenMessages from '../../hooks/useListenMessages';

const Conversations = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef(null);
  useListenMessages();

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="conversations-container">
      {loading && <Loader />}
      {!loading && messages.length === 0 && (
        <h2 className="no-conversation">Send a message to start conversation.</h2>
      )}
      {!loading && messages.length > 0 && (
        messages.map((data, i) => (
          <div key={i} ref={i === messages.length - 1 ? lastMessageRef : null}>
            <Message data={data} />
          </div>
        ))
      )}
    </div>
  );
};

export default Conversations;
