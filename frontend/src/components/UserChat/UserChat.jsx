import React, { useEffect } from 'react';
import './UserChat.css';
import { useChatContext } from '../../context/chatContext';
import { useSocketContext } from '../../context/socketContext';

const UserChat = ({ data }) => {
  const { selectedConversation, setSelectedConversation } = useChatContext();

  const isSelect = selectedConversation?._id === data._id;
  
  const {onlineUsers} = useSocketContext()

  const isOnline = onlineUsers.includes(data._id);

  return (
    <div
      className='user-chat'
      onClick={() => setSelectedConversation(data)}
      style={{ backgroundColor: isSelect ? '#FDFFD2' : '' }}
    >
      <img src={data.profilePic} className='user-profile' alt='profile' />
      <div className="chat-detail">
        <p className="username">{data.username}</p>
        {/* <p className="message">Hello man</p> */}
      </div>
      {
        isOnline &&
      <div className="online-indicator"></div>
      }
    </div>
  );
};

export default UserChat;
