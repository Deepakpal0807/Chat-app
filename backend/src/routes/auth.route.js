import express from "express"
import { login, logout, signup,updateprofilephoto ,checkauth,updatename} from "../controller/auth.controller.js";
import { protectroute } from "../middleware/protect.middleware.js";

const router=express.Router()

const app=express();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/updateprofilephoto",protectroute,updateprofilephoto);
router.get("/check",protectroute,checkauth);
router.put("/updatename",protectroute,updatename);





export default router;