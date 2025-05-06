import React,{useState} from 'react'
import {useAuthStore} from "../Store/useAuth.js"
import { useChatStore } from '../Store/useChatStore.js';
import { Camera, Mail, User,X } from "lucide-react";
import avatar from "../lib/avatar.jpeg"
import Showprofile from '../Component/Showprofile.jsx';

const Profile = () => {
  const {authuser,updateprofile,isupdatingproflie
  } = useAuthStore();
  const{selectedUser,closeprofile,showimage,showprofileimage }=useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

 const handlecloseprofile=()=>{
    closeprofile();
 }
 const handleshowprofile=()=>{
    showprofileimage()

 }

    if(showimage){
        return <Showprofile/>
    }
 
  return (

    <div className="h-screen pt-20 -mt-30">
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="bg-base-300 rounded-xl p-6 space-y-8">
        <div className='text-center flex flex-row justify-around'>

        <div className="text-center w-2xl">
          <h1 className="text-2xl font-semibold ">Profile</h1>
          <p className="mt-2"> profile information</p>
        </div>
        <div>
            <button onClick={handlecloseprofile}><X size={36}/></button>
        </div>
        </div>

        {/* avatar upload section */}

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || selectedUser.profilepic || avatar}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 "
              onClick={handleshowprofile}
            />
            
          </div>
         
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{selectedUser?.name}</p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{selectedUser?.email}</p>
          </div>
        </div>

        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium  mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{selectedUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Profile