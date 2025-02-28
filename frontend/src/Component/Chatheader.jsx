import React from "react";
import { useChatStore } from "../Store/useChatStore";
import { useAuthStore } from "../Store/useAuth";
import avatar from "../lib/avatar.jpeg";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineuser } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className=" p-2.5 border-b border-base-300 border-white w-4xl">
      <div className="flex items-center justify-between ">
        {/* Avatar & User Info */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={selectedUser.profilePic || avatar}
                alt={selectedUser.name}
                className="w-full h-full object-cover"
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
