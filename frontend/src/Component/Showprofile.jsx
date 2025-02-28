import React from 'react';
import { useAuthStore } from "../Store/useAuth.js";
import { useChatStore } from '../store/useChatStore.js';
import { X } from "lucide-react";
import avatar from "../lib/avatar.jpeg";

const Showprofile = () => {
  const { selectedUser, closeprofileimage } = useChatStore();

  return (
    <div className="h-screen pt-20 flex flex-col items-center">
      <div className="relative mt-8">
        {/* Profile Image */}
        <img
          src={selectedUser.profilepic || avatar}
          alt="Profile"
          className="size-90 rounded-full object-cover border-4"
        />
        {/* Close Button */}
        <button
          onClick={closeprofileimage}
          className="absolute top-2 right-2 bg-black rounded-full p-1 shadow-md hover:bg-gray-200"
        >
          <X size={24} />
        </button>
      </div>
      <div className='flex flex-col items-center'>
        <h1 className="text-2xl font-bold text-white-900 mt-8">{selectedUser.name}</h1>
        <h3 className='text-xl font-italic text-red-900'>{selectedUser.email}</h3>

      </div>
    </div>
  );
};

export default Showprofile;
