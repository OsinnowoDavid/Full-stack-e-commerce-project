import { extname } from "path";
import express from "express"

import {addflashdeals,getflashdeals,removingProducts,singleproduct,update}  from "../controllers/flashDealcontroller.js";
import upload from "../middleware/multer.js";

const flashdealsroutes = express.Router()

flashdealsroutes.post("/addflashdeal",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addflashdeals)
flashdealsroutes.post("/removes",removingProducts)
flashdealsroutes.get("/getflashdeals",getflashdeals)
flashdealsroutes.put("/update/:id",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),update)
flashdealsroutes.post("/singleproducts",singleproduct)

export default flashdealsroutes