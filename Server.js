
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import multer  from "multer"
import connectcloudinary from "./config/cloudinary.js"
// import db from "./config/mysql.js"
import Userrouter from "./routes/userRoute.js"
import productrouter from "./routes/productsroute..js"
import { connectoDatabase } from "./config/mysql.js"
// const path = require("path")
import {verifiedToken,verifiedUser} from "./controllers/usercontroller.js"
import Categoryroute from "./routes/cateoryroute.js"
import hotdealsroutes from "./routes/hotdealsroutes.js"
import flashdealsroutes from "./routes/flashdealsroutes.js"
const db = await connectoDatabase()
// app config
const app = express();
dotenv.config()

connectcloudinary 
db
// midllewares
app.use(express.json())
app.use(cors());
app.use(express.static("public"))
app.use(express.urlencoded({extended:true }))

app.get('/verified', verifiedToken, verifiedUser);



// api endpoints
app.use("/api/user",Userrouter)
app.use("/api/categories",Categoryroute)
app.use("/api/product",productrouter)
app.use("/api/hotdeals",hotdealsroutes)
app.use("/api/flashdeals",flashdealsroutes)



const storage = multer.diskStorage({
    
    destination:(req, file ,cb) =>{
        cb(null,"public/images")
    },
    filename:function (req, file,cb) {
         return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

    const upload = multer({
        storage
    })







const get = app.get("/uploaddata" , async (req,res) =>{
    const sql = "SELECT * FROM products"
    const data =  db.query(sql, (err,result) => {
        throw new Error (err)
            return res.json(result)
    })
    return res.status({message:"success"})
})


    // dont delete this code 

    app.post("/addproduct", upload.single("file"), async (req,res) =>{

        const sql =  "INSERT INTO products (`Name`,`Price`,`Descriptions`,`Rate`,`image`) VALUES(?)";
        const values =[
           req.body.Name,
           req.body.Price,
           req.body.Descriptions,
           req.body.Rate,
           req.body.image
        ]

        
   await db.query(sql,[values],(err, result) =>{
  
     
    })


})

app.listen(5000, () =>{
    console.log("server is running on port 5000")
})    