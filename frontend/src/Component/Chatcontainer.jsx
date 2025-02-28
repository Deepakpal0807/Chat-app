import React from 'react'
import {useChatStore} from "../Store/useChatStore.js"
import { useEffect } from 'react';
import Chatheader from './Chatheader.jsx';
import MessageInput from './MessageInput.jsx';
import Chatskelton from "../Component/Skeltons/Chatskelton.jsx"

const Chatcontainer = () => {
  const {
    message,
    isMessageloading,
    setSelectedUser,
    selectedUser,
    getMessage
  } = useChatStore();

  useEffect(() => {
  getMessage(selectedUser._id)
  }, [selectedUser._id,getMessage])

  if(isMessageloading){
    return (
      <div>
        <Chatheader />
        <Chatskelton/>
        <MessageInput/>
      </div>
    )
  }
  return (
    <div>
      <Chatheader/>
      <p>{selectedUser.name}</p>

      <MessageInput/>
    </div>
  )
}

export default Chatcontainer