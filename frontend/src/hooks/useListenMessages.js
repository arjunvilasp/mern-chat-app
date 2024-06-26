import React, { useEffect } from 'react'
import { useChatContext } from '../context/chatContext'
import { useSocketContext } from '../context/socketContext'
// import notification from '../assets/notification.mp3'

const useListenMessages = () => {

    const {socket} = useSocketContext()
  
    const {messages,setMessages} = useChatContext()

    useEffect(()=>{

        // const notificationSound = new Audio(notification)
        // notificationSound.play();
        socket?.on('newMessage',(newMessage)=>{
            setMessages([...messages,newMessage])
        })

        return ()=>{
            socket?.off('newMessage');
        }

    },[socket,messages])
}

export default useListenMessages