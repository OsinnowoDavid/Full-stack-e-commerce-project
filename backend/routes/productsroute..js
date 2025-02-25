import { extname } from "path";
import express from "express"

import {addproduct,listproducts,deleteProduct,singleproduct,get, update}  from "../controllers/productcontroller.js";
import upload from "../middleware/multer.js";

const productrouter= express.Router()

productrouter.post("/add",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addproduct)
productrouter.post("/delete",deleteProduct)
productrouter.get("/listproducts",get)
productrouter.put("/update/:heroid",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),update)
productrouter.get("/singleproducts/:id",singleproduct)

export default productrouter