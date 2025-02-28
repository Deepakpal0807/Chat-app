import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../Store/useAuth.js";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeltons/Chatskelton";
import avatar from "../lib/avatar.jpeg"

const ChatContainer=()=>{
  
  const {
    messages,
    getMessage,
    isMessagesLoading,
    selectedUser,
    updatemessage
  } = useChatStore();
  
  const { authuser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [allmessage,setallmessage]=useState([]);
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
     
    //  console.log("Gathering message");
    //  console.log(messages);
 }, [selectedUser._id,updatemessage])

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
                        <div key={message?._id} className={`chat ${isSentByAuthUser ? "chat-end" : "chat-start"}`}>
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
                            <time className="text-xs opacity-50 ml-1">{message?.createdAt || "Time Unavailable"}</time>
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

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessage,
//     isMessagesLoading,
//     selectedUser,
//   } = useChatStore();
  
//   const { authuser } = useAuthStore();
//   const messageEndRef = useRef(null);
//   const [allmessage,setallmessage]=useState([]);
//   // Fetch messages only when selectedUser exists
//   useEffect(() => {
//     if (selectedUser?._id) {
//        getMessage(selectedUser._id);
//     }
//     setallmessage(messages);
//     console.log(allmessage);
//   }, [selectedUser?._id, getMessage]);

//   // Scroll to the latest message smoothly
//   useEffect(() => {
   
//   }, [messages]);

//   // Show loading skeleton if messages are being loaded
//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }
    
//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
       
//         {messages.length > 0 ? (
//           messages.map((message) => {
          
//             console.log("Sender ID:", message?.senderId);
//             console.log("Receiver ID:", message?.receiverId);

//             const isSentByAuthUser = message?.senderId?.toString() === authuser?._id?.toString();

//             return (
//               <div key={message?._id} className={`chat ${isSentByAuthUser ? "chat-end" : "chat-start"}`}>
//                 <div className="chat-image avatar">
//                   <div className="size-10 rounded-full border">
//                     <img
//                       src={
//                         isSentByAuthUser
//                           ? authuser?.profilepic || "/default-avatar.png"
//                           : selectedUser?.profilepic || "/default-avatar.png"
//                       }
//                       alt="profile pic"
//                     />
//                   </div>
//                 </div>
//                 <div className="chat-header mb-1">
//                   <time className="text-xs opacity-50 ml-1">{message?.createdAt || "Time Unavailable"}</time>
//                 </div>
//                 <div className="chat-bubble flex flex-col">
//                   {message?.image && (
//                     <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
//                   )}
//                   {message?.text && <p>{message.text}</p>}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-gray-500">No messages yet</p>
//         )}
//         {/* Empty div for scrolling to the latest message */}
//         <div ref={messageEndRef}></div>
//       </div>

//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;
