import React from 'react'
import './NoChatSelected.css'


const NoChatSelected = () => {
  return (
    <div className='no-chat-selected-container'>
        <img src="/chat.webp" alt="" />
        <h2>Select a Chat to start conversation</h2>
    </div>
  )
}

export default NoChatSelected