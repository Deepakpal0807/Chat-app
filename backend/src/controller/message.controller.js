import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../utils/cloudinary.js"
import mongoose from "mongoose"
import { getReceiverSocketId } from "../utils/socket.js"
import {io} from "../utils/socket.js"

export const getuserforsidebar=async(req,res)=>{
    try {
        const loguser=req.user._id;
        const filteruser= await User.find({_id:{$ne:loguser}}).select("-password");

        res.status(200).json(filteruser);
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });

        
    }
}

export const getallmessage = async (req, res) => {
    try {
      const senderId = req.user._id.toString(); // Ensure sender ID is a string
      const { id: receiverId } = req.params; // Get receiver ID from params
  
      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: receiverId }, // Fixed field name
          { senderId: receiverId, receiverId: senderId }, // Fixed field name
        ],
      }).sort({ createdAt: 1 }); // Optional: Sort by timestamp for ordered messages
  
     
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Error fetching messages" });
    }
  };
  

export const sendmessage = async (req, res) => {
    // console.log(req.body);
    try {
        const senderId = new mongoose.Types.ObjectId(req.user._id);
        const receiverId = new mongoose.Types.ObjectId(req.params.id);
        const { text, image } = req.body;
        console.log(req.body);

        let imageurl = ""; // Use let instead of const

        if (image) {
            try {
                const url = await cloudinary.uploader.upload(image);
                imageurl = url.secure_url;
            } catch (uploadError) {
                console.error("Image upload failed:", uploadError);
                return res.status(500).json({ message: "Image upload failed", error: uploadError });
            }
        }

        // console.log(senderId);
        // console.log(receiverId);

        const newmessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageurl
        });

        await newmessage.save();
        // console.log(newmessage);
        const receiversocketid= getReceiverSocketId(receiverId);
        if(receiversocketid){
            io.to(receiversocketid).emit("newmessage",newmessage);
        }

        res.status(201).json({newmessage});

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Error sending message", error });
    }
};

