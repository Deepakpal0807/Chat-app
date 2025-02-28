import Sidebar from '../Component/Sidebar.jsx';
import NochatSelected from '../Component/NochatSelected.jsx';
import Chatcontainer from '../Component/Chatcontainer.jsx';
import React from 'react';
import { useChatStore } from '../Store/useChatStore.js';

const Homepage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200 border border-white flex justify-center items-center">
      <div className="bg-base-100 rounded-lg p-4 shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] flex">
        <Sidebar />
        <div className="flex-1 h-full">
          {!selectedUser ? <NochatSelected /> : <Chatcontainer />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
