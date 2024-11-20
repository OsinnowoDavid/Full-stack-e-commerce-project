
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
app.use("/api/product",productrouter)


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





    


// app.get("/getproducts", (req,res) => {
//     // res.send(" from the cloud server")
//     const sql ="SELECT * FROM detail"

//     db.query(sql, (err, data) =>{
//         if (err) return res.json("error")
//             return res.json(data)
//     })
// })



// app.get("/adminproducts" , (req,res) =>{
//     const sql = "SELECT * FROM products"
//     db.query(sql, (err,data) => {
//         if (err) return res.json("Error")
//             return res.json(data)
        

//     })
// })

const get = app.get("/uploaddata" , async (req,res) =>{
    const sql = "SELECT * FROM products"
    const data =  db.query(sql, (err,result) => {
        throw new Error (err)
            return res.json(result)
    })
    return res.status({message:"success"})
})


// app.post("/uploaddata",(req,res) =>{

//     const sql = "INSERT INTO productdetail (`productCategory`,`productDescription`,`productRate`,`productDelivery`,`productPrice`) VALUES(?)";
//     const values=[
//                 req.body.productCategory,
//                 req.body.productDescription,
//                 req.body.productRate,
//                 req.body.productDelivery,
//                 req.body.productPrice,
            
//                ]

    // db.query(sql,[values],(err, result) =>{
    //     if(err) return console.log(err)
    //         return res.json({Status:"success"})

    // })
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