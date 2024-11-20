
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
  

  export {getexplore}

