import React, { useEffect, useState } from "react";
import Sidebar from "../Component/Sidebar.jsx";
import NochatSelected from "../Component/NochatSelected.jsx";
import Chatcontainer from "../Component/Chatcontainer.jsx";
import { useChatStore } from "../Store/useChatStore.js";
import Userprofile from "../pages/Userprofile.jsx";

const Homepage = () => {
  const { selectedUser, friendprofile } = useChatStore();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] bg-base-200 flex justify-center items-center mt-16 w-full">
      <div className="bg-base-100 rounded-lg shadow-cl w-[95vw] flex flex-col h-full">
        <div className="flex flex-1 w-full">
          {/* If screen width < 500px */}
          {screenWidth < 500 ? (
            !selectedUser ? (
              <Sidebar />
            ) : friendprofile ? (
              <Userprofile />
            ) : (
              <Chatcontainer />
            )
          ) : (
            <>
            
              <Sidebar />
              <div className="flex-1 flex flex-col h-full">
                {!selectedUser ? <NochatSelected /> : friendprofile ? <Userprofile /> : <Chatcontainer />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
