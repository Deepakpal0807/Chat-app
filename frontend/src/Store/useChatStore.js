import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from 'react-toastify'

export const useChatStore=create((set)=>({
    message:[],
    users:[],
    selectedUser:null,
    isUserloading:false,
    isMessageloading:false,
    

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
        set({isMessageloading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`);
            set({message:res.data})
            
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
    }

}))