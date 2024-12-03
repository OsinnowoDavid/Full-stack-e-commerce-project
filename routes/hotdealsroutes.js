import { extname } from "path";
import express from "express"

import {addHotDeal,getHotDeal,removingProducts,singleproduct}  from "../controllers/Hotdealcontroller.js";
import upload from "../middleware/multer.js";

const hotdealsroutes = express.Router()

hotdealsroutes.post("/addhostdeals",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addHotDeal)
hotdealsroutes.post("/removes",removingProducts)
hotdealsroutes.get("/gethotdeal",getHotDeal)
hotdealsroutes.post("/singleproducts",singleproduct)

export default hotdealsroutes