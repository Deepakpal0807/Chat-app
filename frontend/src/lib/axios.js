import axios from "axios";

export const axiosInstance=axios.create({
    baseURL: 'https://chat-app-9mf1.onrender.com/api',
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true
    
})
