import React, { useEffect, useState } from "react";
import { useChatStore } from "../Store/useChatStore.js";
import { X } from "lucide-react";
import avatar from "../lib/avatar.jpeg";

const Showprofile = () => {
  const { selectedUser, closeprofileimage } = useChatStore();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen pt-20 flex flex-col items-center ${
        screenWidth < 500 ? "w-screen" : "w-[100vw]"
      }`}
    >
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
          className="absolute top-2 right-2 bg-black text-white rounded-full p-1 shadow-md hover:bg-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 mt-8">{selectedUser.name}</h1>
        <h3 className="text-xl italic text-red-900">{selectedUser.email}</h3>
      </div>
    </div>
  );
};

export default Showprofile;
