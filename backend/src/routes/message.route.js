import express from "express"
import { getuserforsidebar,getallmessage,sendmessage } from "../controller/message.controller.js";
import {protectroute } from "../middleware/protect.middleware.js"
   
const router=express.Router();

router.get("/users",protectroute,getuserforsidebar);
router.get("/:id",protectroute,getallmessage);
router.post("/send/:id",protectroute,sendmessage);






export default router;