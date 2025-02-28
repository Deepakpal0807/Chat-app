import express from "express"
import authRoute from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connecttoDB } from "./db/connect.db.js";
import cookieParser from "cookie-parser"

import messageRoute from "./routes/message.route.js"
import cors from "cors"




const app=express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
 // 👈 Important: This enables JSON parsing
// app.use(express.urlencoded({ extended: true })); // 👈 Optional: For form data
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173", // Change to match your frontend URL
  credentials: true,  // **Required for cookies**
}));





app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);



dotenv.config();



const port=process.env.PORT

app.get("/",(req,res)=>{ 
    res.send("HELLO word");
})

connecttoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
  });