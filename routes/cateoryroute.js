import express from "express"
import {getcategories,insertcategory} from "../controllers/category.js"

import upload from "../middleware/multer.js";

const Categoryroute = express.Router()
Categoryroute.post("/postcategory",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),insertcategory)
Categoryroute.get("/getcategories", getcategories )
export default Categoryroute