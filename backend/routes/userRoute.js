import express from "express"
import{registeruser,loginuser,verifiedUser,verifiedToken} from "../controllers/usercontroller.js"

import  verifyToke from "../middleware/authMiddleware.js"
const Userrouter = express.Router();

Userrouter.post("/register",registeruser)
Userrouter.post("/login",loginuser)
Userrouter.post("/addminlogin", )
Userrouter.get("/verified",verifiedToken,verifiedUser )

export default Userrouter
// userRoute.js

