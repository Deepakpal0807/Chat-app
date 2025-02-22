import mongoose from "mongoose";

export const connecttoDB = async (params) => {
    try{
         const x=await mongoose.connect(process.env.MONGODB_URI);
         console.log("Database connection success  :  ",x.connection.host);
    }
    catch(e){
        console.log("Error connecting to DB");
    }
}