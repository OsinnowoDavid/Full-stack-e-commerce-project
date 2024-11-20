import { extname } from "path";
import express from "express"

import {addproduct,listproducts,removingProducts,singleproduct,get}  from "../controllers/productcontroller.js";
import upload from "../middleware/multer.js";

const productrouter= express.Router()

productrouter.post("/add",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addproduct)
productrouter.post("/removes",removingProducts)
productrouter.get("/listproducts",get)
productrouter.post("/singleproducts",singleproduct)

export default productrouter