import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from 'react-toastify'
import { useAuthStore } from "./useAuth.js";

export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserloading:false,
    isMessageloading:false,
    updatemessage:false,
    friendprofile:false,
    showimage:false,
    
    showprofile:()=>{
        set({friendprofile:true})
    },
    closeprofile:()=>{
      set({friendprofile:false})
    },
    showprofileimage:()=>{
        set({showimage:true})
    },
    closeprofileimage:()=>{
      
        set({showimage:false})
    }   , 

    getuser: async()=>{
        
        set({isUserloading:true})
        try {
            const response = await axiosInstance.get('/message/users')
            set({users:response.data})            
            
        } catch (error) {
            console.log(error);
            toast.error('Error fetching users')
            
        }
        finally{
            set({isUserloading:false});
        }
    },

    getMessage:async(userId)=>{
        // console.log(userId)
        set({isMessageloading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`);
            console.log(res.data);

        
    set({ messages: res.data });
            
        } catch (error) {
            console.log(error);
            toast.error('Error fetching messages')
            
        }
        finally{
            set({isMessageloading:false});
        }

    },

    setSelectedUser:(user)=>{
        set({selectedUser:user});
    },
    sendMessage: async (data) => {
        
        // console.log(data);
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, data);
            set({updatemessage:true})
            set({ messages: [...messages, res.data] }); // 
            set({updatemessage:false})
            // Use res.data instead of res
            // console.log("Message sent:", res.data);
        } catch (error) {
            console.error("Axios Error:", error.response ? error.response.data : error.message);
            toast.error("Error sending message in chatstore");
        }
        finally{
            
        }
    },
    subscribetomessage:()=>{
        // console.log("subscribetomessage");
        const { selectedUser, messages } = get();
        if(!selectedUser)return ;
        const socket=useAuthStore.getState().socket;
        socket.on("newmessage",(data)=>{
            set({
                messages: [...get().messages, data],
            })
            // console.log(data);
        })
    },
    unsubscribetomessage:()=>{
        // console.log("unsubscribetomessage");
        const { selectedUser, messages } = get();
        if(!selectedUser)return ;
        const socket=useAuthStore.getState().socket;
    
        socket.off("newmessage");
        },

    

}))