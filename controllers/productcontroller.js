import { v2 as cloudinary } from 'cloudinary';

import {connectoDatabase} from "../config/mysql.js"
import { promise } from "bcrypt/promises.js"
// add products`


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const addproduct = async (req,res) =>{

    
    try{

        const{name,description,price,category,subcategory,sizes,bestseller}= req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)
         let imageurl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path ,{resource_type:"image"})

                return result.secure_url
                
            })
         )

       
         
         // Prepare data for insertion
    // const productData = [
    //   name,
    //   description,
    //   // category,
    //   price,
    //   // image: imageurl,
    //   // imageurl,
    //   // subcategory,
    //   // bestseller === "true" ? true : false,
    //   // sizes,
    //   JSON.stringify(imageurl), // Store image URLs as JSON string
    //   date: new Date() // Current date
    // ]
    const productData = [name, description, price, JSON.stringify(imageurl), new Date()];
    console.log(imageurl)

        const db = await connectoDatabase()

const sql = "INSERT INTO products (`name`, `description`,`price`,`image`,`date`) VALUES (?)";

await db.query(sql, [productData], (err, result) => {
  if (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "Database insertion error" });
  }
  res.json({ success: true, message: "Product added successfully!" });
});

console.log("Product details:", name, description, price, category, subcategory, sizes, bestseller);
console.log("Image URLs:", imageurl);

} catch (error) {
res.status(500).json({ success: false, message: error.message });
console.error(error);
}
};
//  list products
const listproducts = async (req,res) =>{
  try{

  }
  catch(err){
    console.log(err)
  }

}
// function for removing products
const removingProducts = async (req,res) =>{

}




const get = async (req, res) => {
  const productid = req.params.id
  const sql = "SELECT * FROM products"; // Make sure your table name is correct

  try {
    const db = await connectoDatabase();
    const [result] = await db.query(sql,)
      
    // Log the result to check if the data is fetched correctly
    // console.log("result:", result);

    // If no data is returned, send an appropriate response
    if (result.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ message: "success", product: result });
    
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

  

// functions for singleproducts
const singleproduct = async (req,res) =>{
  try{
      

  } catch (err){}

}


export {addproduct,listproducts,removingProducts,singleproduct ,get}