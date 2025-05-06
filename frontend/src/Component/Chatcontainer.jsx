import { useEffect, useRef } from "react";
import { useChatStore } from "../Store/useChatStore";
import { useAuthStore } from "../Store/useAuth.js";
import Chatheader from "./Chatheader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeltons/Chatskelton";
import avatar from "../lib/avatar.jpeg";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    messages,
    getMessage,
    isMessagesLoading,
    selectedUser,
    updatemessage,
    subscribetomessage,
    unsubscribetomessage,
  } = useChatStore();
  
  const { authuser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessage(selectedUser._id);
      subscribetomessage();
    }
    return () => unsubscribetomessage();
  }, [selectedUser?._id, updatemessage, subscribetomessage, unsubscribetomessage]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="h-[10%] bg-gray-900 text-white shadow-md">
          <Chatheader />
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 bg-gray-800">
          <MessageSkeleton />
        </div>
        <div className="h-[10%] bg-gray-900 text-white">
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full mb-4">
      <div className="h-[11vh] bg-gray-900 text-1white ">
        <Chatheader />
      </div>

      <div className="h-[72vh] overflow-y-auto px-4 py-2 bg-gray-800">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages yet
          </div>
        ) : (
          messages.map((message, index) => {
            const isSentByAuthUser = message?.senderId?.toString() === authuser?._id?.toString();
            const isLastMessage = index === messages.length - 1;

            return (
              <div
                key={message?._id}
                className={`chat ${isSentByAuthUser ? "chat-end" : "chat-start"} w-full`}
                ref={isLastMessage ? messageEndRef : null}
              >
                <div className="chat-image avatar">
                  <div className="size-12 rounded-full border">
                    <img
                      src={isSentByAuthUser ? authuser?.profilepic || avatar : selectedUser?.profilepic || avatar}
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1.5 text-gray-400">
                  <time className="text-xs opacity-75 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col max-w-full md:max-w-md lg:max-w-lg break-words bg-gray-700 text-white">
                  {message?.image && (
                    <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
                  )}
                  {message?.text && <p>{message.text}</p>}
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef}></div>
      </div>

      <div className="h-[8vh] bg-gray-900 text-white">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
