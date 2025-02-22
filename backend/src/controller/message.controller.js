import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../utils/cloudinary.js"

export const getuserforsidebar=async(req,res)=>{
    try {
        const loguser=req.user._id;
        const filteruser= await User.find({_id:{$ne:loguser}}).select("-password");

        res.status(200).json(filteruser);
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });

        
    }
}

export const getallmessage=async(req,res)=>{
  try {
    const sender=req.user._id;
    const {id:reciever}=req.params;
    const message=await Message.find({
        $or: [
            { sender: sender, reciever: reciever },
            { sender: reciever, reciever: sender },
            ],

    })
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });

    
  }
}

export const sendmessage=async(req,res)=>{
    try {
        const sender=req.user._id;
        const {id:reciever}=req.params;
        const {text,image}=req.body;
        const imageurl="";
        if(image){
            const url=await cloudinary.uploader.upload(image);
            imageurl=url.secure_url;
        }
        const newmessage=new Message({
         sender,
         reciever,
         text,
         image:imageurl
        })
        await newmessage.save();
        res.status(201).json(newmessage);

        
    } catch (error) {
        res.status(500).json({ message: "Error sending message" });
        
        
    }
}