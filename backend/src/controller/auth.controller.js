 import User from "../models/user.model.js";
 import bcrypt from "bcryptjs"
 import {createtoken} from "../utils/token.js"
import cloudinary from "../utils/cloudinary.js";
 
 export const signup= async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(req.body);
    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"All field are required"});
        }
        if(password.length < 6){
        return res.status(400).json({message:" Password must be atleast of size 6"});
        }
        console.log(name);
        console.log(email);
        console.log(password);

        const x=await User.findOne({email});
        if(x){
            return res.status(400).json({message:"Email already exists"});
        }
        
        const salt= await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        console.log(hashpassword);
        const user=new User({
            name,
            email,
            password:hashpassword
            });


            if(user){
               createtoken(user._id,res);
               await user.save();
               return  res.status(200).json({
                message:"User created successfully",
                name:user.name,
                email:user.email,
                password:user.password,
                profilepic:user.profilepic

               });


            }else{
                return res.status(400).json({message:"Failed to create user"});

            }
            
            
                
    } catch (error) {
        console.log("some error in signup controller..  ", error);
        return res.status(400).json({message:"Error in creating a user"});
    }
   
};
export const login= async(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    try {
        if(!email || !password){
            return res.status(400).json({message:"Please enter both email and password"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password should be at least 6 characters long"})
        }
        const user=await User.findOne({email});
        if(!user){
             return res.status(400).json({message:"Invalid email"});
        }

        const pass= await bcrypt.compare(password,user.password);
        
        if(!pass){
            return res.status(400).json({message:"Invalid password"});
        }
        
        return  res.status(200).json({message:"User logged in successfully",token:token});

        
    } catch (error) {
        console.log("some error in login controller..  ", error);
        return res.status(400).json({message:"Error in logging in a user"});        
    }

};
 export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{
            maxage:0
        })
        return res.status(200).json({message:"User logged out successfully"});
    } catch (error) {
        console.log("some error in logout controller..  ", error);
        return res.status(400).json({message:"Error in logging out a user"});
        
        
    }

};


export const updateprofilephoto=async(req,res)=>{
 try {
    const id=req.user._id;
    const {profilepic}=req.body;
    if(!profilepic){
        return res.status(400).json({message:"Profile picture is required"});
    }

    const image=await cloudinary.uploader.upload(profilepic);
    const user=await User.findByIdAndUpdate(id,{profilepic:image.secure_url},{new:true});
    return res.status(200).json({message:"Profile picture updated successfully"});  
    
    
 } catch (error) {
    console.log("some error in update profile controller..  ", error);
    return res.status(401).json({message:"Error in updating the user profile"});
    
 }
}

export const checkauth=(req,res)=>{
    try {
        return res.status(200).json(req.user);
        
    } catch (error) {
        console.log("some error in check auth controller..  ", error);
        return res.status(401).json({message:"Error in checking the user authentication"});        
    }
}

export const updatename=async (req,res)=>{
    try {
        const id=req.user._id;
        const {newname}=req.body;
        const user=await User.findOneAndUpdate({email},{$set:{name:newname}});
        if(!user){
            return res.status(400).json({message:"User not found"});
            }



    } catch (error) {
        
    }
}