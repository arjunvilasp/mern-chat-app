import React from 'react'
import './Message.css'
import { useAuthContext } from '../../context/authContext'
import { useChatContext } from '../../context/chatContext'


const Message = ({data}) => {

  const {authUser}= useAuthContext()
  const {selectedConversation} = useChatContext()
  
  const fromMe = data.senderId === authUser._id;
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic
  
  return (
    <div className='message-container' style={{justifyContent:fromMe ?  'flex-end' : 'flex-start'}}>
      <img style={{order:2}} className={fromMe ? 'user-profile1' : 'user-profile2'} src={profilePic} alt='profile-img'/>
      <p className={fromMe ? 'message1' : 'message2'}>{data.message}</p>
    </div>
  )
}

export default Message