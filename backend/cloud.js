const express = require("express")
const cors = require("cors")
const cloudinary = require ("../backend/cludinary.js")
const dotenv = require ("dotenv")
const app = express()


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true , limit:"50mb"}))

app.get("/", (req,res)=>{
  const {image} = req.body
  console.log("er are here")
    
})



app.post("/" , async(req,res)=>{
    const {image} = req.body
   const uploadedimage= await cloudinary.uploader.upload(image,
        {
            upload_preset :"unsigned_upload",
            allowed_format:["png","jpeg","svg","ico","jfif","webp"]
               
        }
    , function (error,result){
        if (error){
            console.log(error)
        }
        console.log(result);});
        try{
            res.status(200).json(uploadedimage)
        }catch(err){
            console.log(err)
        }
})

app.listen(7000, ()=>{
    console.log("we are on post 7000")
})