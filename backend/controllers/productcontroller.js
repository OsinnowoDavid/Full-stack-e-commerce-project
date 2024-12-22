import { v2 as cloudinary } from 'cloudinary';

import {connectoDatabase} from "../config/mysql.js"
// import { promise } from "bcrypt/promises.js"
// add products`


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addproduct = async (req,res) =>{

    
    try{

        const{name,description,price,category, rate, subcategory,sizes,bestseller}= req.body

        const image1 = req.files.image1 && req.files.image1[0]
        // const image2 = req.files.image2 && req.files.image2[0]
        // const image3 = req.files.image3 && req.files.image3[0]
        // const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1] .filter((item) => item !== undefined)
         let imageurl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path ,{resource_type:"image", background_removal: "cloudinary_ai"})

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
    const productData = [name, description, price, rate, imageurl, new Date()];
    console.log(imageurl)

        const db = await connectoDatabase()

const sql = "INSERT INTO products (`name`, `description`,`price`,`image`,`date`,`rate`) VALUES (?)";

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

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from URL parameters

    // Ensure ID is provided
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    // Connect to the database
    const db = await connectoDatabase();

    // Prepare SQL query for deletion
    const sql = "DELETE FROM products WHERE id = ?";

    await db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: "Database deletion error" });
      }
      
      // Check if any rows were affected (i.e., product existed)
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, message: "Product deleted successfully!" });
    });
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
// const singleproduct = async (req,res) =>{
//   try{
      

//   } catch (err){}

// }

const update = async (req, res) => {
  try {
    // Validate request body and files
    console.log(req.files); // Debugging
    console.log(req.body); // Debugging


    const{name,description,price,category,subcategory,sizes,bestseller}= req.body

    const image1 = req.files.image1 && req.files.image1[0]

    
    // const image2 = req.files.image2 && req.files.image2[0]
    // const image3 = req.files.image3 && req.files.image3[0]
    // const image4 = req.files.image4 && req.files.image4[0]

    const images = image1 ? [image1] : [];
    const imageurl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );
    const productData = [name, description, price, imageurl, new Date()];

    const db = await connectoDatabase();

    const sql = "UPDATE products SET `name`= ?, `description`= ?, `price`= ?, `image`= ?, `date`= ? WHERE id = ?";
    const id = req.params.id;
    const query = util.promisify(db.query).bind(db);

    await query(sql, [...productData, id]);
    res.json({ success: true, message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.error(error);
  }
};

const singleproduct = async (req, res) => {
  const sql = "SELECT * FROM products WHERE ID = ?"; // Ensure the table name is correct
  const { id } = req.params; // Correct destructuring

  try {
    const db = await connectoDatabase(); // Ensure correct spelling of your function
    const [result] = await db.query(sql, [id]); // Pass `id` correctly in an array
    
    console.log(result); // Log the result to check the data
    
    // If no data is returned, send an appropriate response
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.json({ message: "success", product: result });
  } catch (error) {
    console.error("Database error:", error); // Better error logging
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export {addproduct,listproducts,deleteProduct,singleproduct ,get, update}