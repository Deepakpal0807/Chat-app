import Sidebar from '../Component/Sidebar.jsx';
import NochatSelected from '../Component/NochatSelected.jsx';
import Chatcontainer from '../Component/Chatcontainer.jsx';
import React from 'react';
import { useChatStore } from '../Store/useChatStore.js';
import { useAuthStore } from '../Store/useAuth.js';
import Userprofile from "../pages/Userprofile.jsx";

const Homepage = () => {
  const { selectedUser, friendprofile } = useChatStore();
  const { authuser } = useAuthStore();

  return (
    <div className="h-[calc(100vh-4rem)] bg-base-200 flex justify-center items-center mt-16 w-full">
      <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl flex flex-col h-full">
        <div className="flex flex-1 w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col h-full">
            {!selectedUser ? (
              <NochatSelected />
            ) : friendprofile ? (
              <Userprofile />
            ) : (
              <Chatcontainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
