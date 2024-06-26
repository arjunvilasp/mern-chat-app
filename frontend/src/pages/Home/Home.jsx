import React, { useEffect, useState } from "react";
import "./Home.css";
import UserChat from "../../components/UserChat/UserChat";
import Conversations from "../../components/Conversations/Conversations";
import { useAuthContext } from "../../context/authContext";
import NoChatSelected from "../../components/NoChatSelected/NoChatSelected";
import useGetUsers from "../../hooks/useGetUsers";
import useLogout from "../../hooks/useLogout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/Loader/Loader";
import { useChatContext } from "../../context/chatContext";
import MessageInput from "../../components/Message/MessageInput/MessageInput";



const Home = () => {
  const { authUser } = useAuthContext();

  const {loading,conversations}= useGetUsers();
  
  const {logout}= useLogout();

  const { selectedConversation, setSelectedConversation } = useChatContext();

  return (
    <>
    <div className="home-container">
      <div className="sidebar">
        <div className="user-details">
          <img
            className="profile-pic"
            src={authUser.profilePic}
            alt="profile_pic"
          />
          <p className="username">{authUser.username.toUpperCase()}</p>
          <button className="btn" onClick={logout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          </button>
        </div>
        <div className="conversations">
          {
            !loading ?
            conversations.map((data)=>(
              <UserChat key={data._id} data={data} />
            ))
            :
            <Loader/>
          }
        </div>
      </div>
      <div className="chat">
        {selectedConversation? (
            <div>
              <div className="chat-header">
                <img
                  className="user-img"
                  src={selectedConversation.profilePic}
                  alt="profile-img"
                />
                <p className="username">{selectedConversation.username}</p>
              </div>
              <Conversations/>
              <MessageInput/>
            </div>
         ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Home;
