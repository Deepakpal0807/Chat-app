import {Server} from "socket.io"
import http from "http"
import express from "express"

const app=express()
const server=http.createServer(app);
const io = new Server(server, {
    cors: {
       origin: "http://localhost:5173",  // ✅ Make sure this matches frontend
       credentials: true
    }
 });

 const usersmap={}; //{userId:socketId}
 export function getReceiverSocketId(userId){
    return usersmap[userId];
 }

io.on("connect",(socket)=>{
    console.log("A user connected", socket.id);
    const userId=socket.handshake.query.user;
    if(userId){
        usersmap[userId]=socket.id;
    }
    io.emit("getonlineuser",Object.keys(usersmap));
    socket.on("disconnect", () => {
        console.log("A user disconnected",socket.id);
        delete usersmap[userId];
        io.emit("getonlineuser",Object.keys(usersmap));
        });


})




export {io,app,server};