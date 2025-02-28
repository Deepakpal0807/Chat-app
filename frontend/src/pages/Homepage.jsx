import Sidebar from '../Component/Sidebar.jsx';
import NochatSelected from '../Component/NochatSelected.jsx';
import Chatcontainer from '../Component/Chatcontainer.jsx';
import React,{useEffect} from 'react';
import { useChatStore } from '../Store/useChatStore.js';
import { useAuthStore } from '../Store/useAuth.js';
import Userprofile from "../pages/Userprofile.jsx"

const Homepage = () => {
  const { selectedUser,getMessage,messages,friendprofile } = useChatStore();
  const {authuser}=useAuthStore();
  


  return (
    <div className="min-h-screen bg-base-200 border border-white flex justify-center items-center">
      <div className="bg-base-100 rounded-lg p-4 shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] flex">
        <Sidebar />
        <div className="flex-1 h-full">
        {!selectedUser ? <NochatSelected /> : (friendprofile ? <Userprofile /> : <Chatcontainer />)}

        </div>
      </div>
    </div>
  );
};

export default Homepage;
