import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const baseurl = "http://localhost:5000"; 
export const useAuthStore = create((set, get) => ({
    authuser: null,
    issignup: false,
    issigningup: false,
    islogin: false,
    isloggingin: false,
    isupdatingproflie: false,
    ischeckingauth: true,
    onlineuser: [],
    socket: null, 

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authuser: res.data });
            get().connectSocket(); 
        } catch (error) {
            console.error("Error in checkAuth:", error.response?.data || error.message);
        } finally {
            set({ ischeckingauth: false });
        }
    },

    signup: async (data) => {
        set({ issigningup: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully");
            get().connectSocket(); 1
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ issigningup: false });
        }
    },

    login: async (data) => {
        set({ isloggingin: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            toast.success("Logged in successfully");
            get().connectSocket(); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isloggingin: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateprofile: async (data) => {
        set({ isupdatingproflie: true });
        try {
            const res = await axiosInstance.put("/auth/updateprofilephoto", data);
            set({ authuser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            set({ isupdatingproflie: false });
        }
    },

    updatename: async (newname) => {
        set({ isupdatingproflie: true });
        try {
            const res = await axiosInstance.put("/auth/updatename", { name: newname });
            set({ authuser: res.data });
            toast.success("Name updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Name update failed");
        } finally {
            set({ isupdatingproflie: false });
        }
    },

    connectSocket: () => {
        const { authuser, socket } = get();
        if (!authuser || socket?.connected) return;

        // console.log("Connecting to socket...");
 
        const newSocket = io(baseurl, {
            withCredentials: true,
            query:{
                user: authuser._id
            }
        });

        newSocket.on("connect", () => {
            // console.log("Socket connected:", newSocket.id);
            set({ socket: newSocket }); // ✅ Save socket in state
        });
        newSocket.on("getonlineuser",(users)=>{
            set({ onlineuser: users });
        })

        newSocket.on("disconnect", () => {
            // console.log("Socket disconnected");
            set({ socket: null });
        });
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            // console.log("Disconnecting socket...");
            socket.disconnect();
            set({ socket: null });
        }
    },
}));
