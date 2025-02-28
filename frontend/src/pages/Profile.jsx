import React, { useState } from 'react';
import { useAuthStore } from "../Store/useAuth.js";
import { Camera, Mail, User, Edit2, Check } from "lucide-react";
import Showprofile from '../Component/Showprofile.jsx';
import { useChatStore } from '../store/useChatStore.js';


const Profile = () => {
  const { authuser, updateprofile, isupdatingproflie,updatename } = useAuthStore();
  const {setSelectedUser,showprofileimage,showimage}=useChatStore()
  const [selectedImg, setSelectedImg] = useState(null);
  const [newname, setName] = useState(authuser?.name || "");
  const [isEditing, setIsEditing] = useState(false);

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateprofile({ profilePic: base64Image });
    };
    reader.readAsDataURL(file);
  };

  // Handle Name Update
  const handleNameUpdate = async () => {
    if (newname.trim() !== authuser.name) {
      await updatename({ newname });
    }
    setIsEditing(false);
  };
  const handleshowprofile=()=>{
       setSelectedUser(authuser);
       showprofileimage();
  }
  if(showimage){
    return <Showprofile/>
  }


  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Profile</h1>
            {/* <p className="mt-2">Your profile information</p> */}
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authuser.profilepic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
                onClick={handleshowprofile}
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer transition-all duration-200
                  ${isupdatingproflie ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isupdatingproflie}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isupdatingproflie ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Editable Name Field */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <div className="flex items-center px-4 py-2.5 bg-base-200 rounded-lg border">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={newname}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 bg-transparent outline-none"
                    />
                    <button onClick={handleNameUpdate} className="ml-2 text-green-500">
                      <Check size={20} />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-row items-center justify-between">
                  <span className="pr-6">{authuser.name}</span>
                  <button onClick={() => setIsEditing(true)} className="text-blue-500 ml-5">
                    <Edit2 size={18} />
                  </button>
                </div>
                
                )}
              </div>
            </div>

            {/* Email Section */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authuser?.email}</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authuser.createdAt?.split("T")[0]}</span>
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
  );
};

export default Profile;
