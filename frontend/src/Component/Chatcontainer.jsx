import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../Store/useAuth.js";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeltons/Chatskelton";
import avatar from "../lib/avatar.jpeg"
import {formatMessageTime} from "../lib/utils.js"
import { sub } from "date-fns";

const ChatContainer=()=>{
  
  const {
    messages,
    getMessage,
    isMessagesLoading,
    selectedUser,
    updatemessage,
    subscribetomessage,
    unsubscribetomessage
  } = useChatStore();
  
  const { authuser } = useAuthStore();
  const messageEndRef = useRef(null);
  // Fetch messages only when selectedUser exists

 

  // Show loading skeleton if messages are being loaded
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
 useEffect(() => {
     getMessage(selectedUser._id);
     subscribetomessage();

     
     
    //  console.log("Gathering message");
    //  console.log(messages);
    return ()=> unsubscribetomessage();
 }, [selectedUser._id,updatemessage,subscribetomessage,unsubscribetomessage]);

 useEffect(() => {
  messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [isMessagesLoading]); // Scroll when new messages arrive


  // useEffect(() => {
  //   if(selectedUser){

  //     getMessage(selectedUser._id)
     
  //     console.log("Rendering all message");
  //   }
  // }, [selectedUser._id,getMessage])
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <div className="flex-1 overflow-y-auto">
        {!isMessagesLoading && messages.map((message)=>{
         const isSentByAuthUser = message?.senderId?.toString() === authuser?._id?.toString();
         return (
                        <div key={message?._id} className={`chat ${isSentByAuthUser ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                        >
                          <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                              <img
                                src={
                                  isSentByAuthUser
                                    ? authuser?.profilepic || avatar
                                    : selectedUser?.profilepic || avatar
                                }
                                alt="profile pic"
                              />
                            </div>
                          </div>
                          <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
                          </div>
                          <div className="chat-bubble flex flex-col">
                            {message?.image && (
                              <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
                            )}
                            {message?.text && <p>{message.text}</p>}
                          </div>
                        </div>
                      );
        })}
        </div>
      <MessageInput/>
    </div>
  )
}
export default ChatContainer;

