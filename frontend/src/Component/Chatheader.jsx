import React, { useState } from "react";
import { useChatStore } from "../Store/useChatStore.js";
import { useAuthStore } from "../Store/useAuth.js";
import avatar from "../lib/avatar.jpeg";
import Userprofile from "../pages/Userprofile.jsx"
import { CodeSquare } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser,showprofile ,friendprofile} = useChatStore();
  const { onlineuser } = useAuthStore();
 

  if (!selectedUser) return null;
  const handleprofile=(e)=>{
    // console.log(e);
   
    showprofile();
    // setshowprofile(true);
  }
  if(friendprofile){
    return <Userprofile/>
  }
  

  return (
    <div className="p-3  border-b border-base-300 border-white w-full">
      <div className="flex items-center justify-between mb-3">
       
        <div className="flex items-center gap-3" onClick={handleprofile}>
          <div className="avatar">
            <div className="w-13 h-13 rounded-full overflow-hidden border border-white">
              <img
                src={selectedUser.profilepic || avatar}
                alt={selectedUser.name}
                className="w-full h-full object-cover "
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineuser.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-lg px-2"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
