import express from "express"
import {getcategories,insertcategory ,update} from "../controllers/category.js"

import upload from "../middleware/multer.js";

const Categoryroute = express.Router()
Categoryroute.post("/postcategory",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),insertcategory)
Categoryroute.get("/getcategories", getcategories )
Categoryroute.put("/update/:id",upload.fields ([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]), update)
export default Categoryroute