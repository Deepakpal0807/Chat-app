import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/useAuth.js";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import {useNavigate } from "react-router-dom"
import { useChatStore } from "../Store/useChatStore.js";

const Navbar = () => {
  const { logout, authuser } = useAuthStore();
  const {setSelectedUser}=useChatStore();
  const navigate = useNavigate()
  const handlelogout = async () => {
    logout();
    setTimeout(() => {
      window.location.href="/login"
    }, 1500);
  };
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >


      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all" onClick={()=>{
              setSelectedUser(null);
            }}>
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">VibeChat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            

            {authuser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-8" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={handlelogout}>
                  <LogOut className="size-8" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
