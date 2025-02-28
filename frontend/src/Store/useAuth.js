import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from 'react-toastify'


export const  useAuthStore=create((set)=>({
    
    authuser:null,
    issignup:false,
    issigningup:false,
    islogin:false,
    isloggingin:false,
    isupdatingproflie:false,
    ischeckingauth:true,
    onlineuser:[],
 
    checkAuth: async () => {
        try {
            console.log("Inside the useauth function")
            const res = await axiosInstance.get("/auth/check");
            console.log("Auth response:", res.data);
            set({ authuser: res.data });
        } catch (error) {
            console.error("Error in checkAuth:", error.response?.data || error.message);
        } finally {
            set({ ischeckingauth: false });
        }
    },

    signup: async(data)=>{
        
        set({issigningup:true});
        console.log(data);
        try {
           
            const name=data.fullName;
            const email=data.email;
            const password=data.password;
           
            const res = await axiosInstance.post("/auth/signup",{name,email,password});
            console.log("Signup response:", res.data);
           toast.success("Account created successfully");
        //    setTimeout(() => navigate("/"), 1500);
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }finally{
            set({issigningup:false});
        }
    },
    login:async(data)=>{

        set({islogginin:true})
        try {
            const email=data.email;
            const password=data.password;
            const a=await axiosInstance.post("/auth/login",{email,password});
            console.log("Login response:", a);
            toast.success("Logged in successfully");

            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }finally{
            set({islogginin:false});
        }
    }
    ,
    logout:async()=>{
         try {
            const res = await axiosInstance.post("/auth/logout");
            console.log("Logout response:", res.data);
            toast.success("Logged out successfully");
            // setTimeout(() => navigate("/login"), 1500); 
            
         } catch (error) {
            toast.error(error.response.data.message);            
         }

    },
    updateprofile:async(data)=>{
        // console.log("Printting the profile image",data)
        set({isupdatingproflie:true});
        
           try {
            console.log(data);
            const res = await axiosInstance.put("/auth/updateprofilephoto",data);
            console.log("Update profile response:", res.data);
            set({authuser:res.data});
            toast.success("Profile updated successfully");
            // setTimeout(() => navigate("/"), 1500);

            
           } catch (error) {
            toast.error(error.response.data.message);
            
           }
           finally{
            set({isupdatingproflie:false});

           }
    },
    updatename:async(newname)=>{
        set({isupdatingproflie:true})
        try {
            console.log(newname)
            const res = await axiosInstance.put("/auth/updatename",newname);
            
            console.log("Update name response:", res.data);
            set({authuser:res.data});   
            toast.success("Name updated successfully");
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
        finally{
            set({isupdatingproflie:false});
        }

    }


    

}));