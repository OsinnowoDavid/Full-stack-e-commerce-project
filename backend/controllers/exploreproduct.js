
import {connectoDatabase} from "../config/mysql.js"

const getexplore = async (req, res) => {
    const productid = req.params.id
    const sql = "SELECT * FROM productexplore"; // Make sure your table name is correct
  
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
  
      const sql = "UPDATE productexplore SET `name`= ?, `description`= ?, `price`= ?, `image`= ?, `date`= ? WHERE id = ?";
      const id = req.params.id;
      const query = util.promisify(db.query).bind(db);
  
      await query(sql, [...productData, id]);
      res.json({ success: true, message: "Product updated successfully!" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
      console.error(error);
    }
  };
  

  export {getexplore , update}

