import jwt from "jsonwebtoken"
import User from "../models/user.model.js"



export const protectroute=async (req,res,next)=>{
  try {
      const token=req.cookies.jwt;
      console.log("Searching for token");
      console.log(token);
      if(!token){
        // console.log("Token are not found..");
        return res.status(401).json({message:"Session Expired! Login Again"})
      }
      const decoded=await jwt.verify(token,process.env.SECRET_KEY);
    //   console.log("Decoded token",decoded);
      if(!decoded){
        // console.log("Token is invalid");
        return res.status(401).json({message:"Session Expired! Login Again"})
      }
      const user=await User.findById(decoded.id).select("-password");
      console.log(user);
      req.user=user;
      next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"})
    
  }
};

