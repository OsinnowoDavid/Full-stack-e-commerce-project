import bcrypt from "bcrypt"
import {connectoDatabase}from "../config/mysql.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
//  user login

dotenv.config()

const creatertoken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)

}




const registeruser = async (req,res) =>{


    try{
        
    const {Name,Password,Email} = req.body;
        const db = await connectoDatabase()
        const sql = "SELECT * FROM userdetail WHERE Email = ?"
        const [row] = await db.query(sql,[Email]) 
        if (row.length > 0){
            return res.status(409).json({message:"user already existed"})
        }
        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(Password,saltRounds);

        await db.query("INSERT INTO userdetail (Name,Email,Password) VALUES(?,?,?)",[Name,Email,hashpassword])
        res.status(200).json({message:"user created successfully"})

    }catch(err) {
        console.log(err)
    }

}
const loginuser = async (req, res) => {
    const { Password, Email } = req.body;

    try {
        const db = await connectoDatabase();
        const sql = "SELECT * FROM userdetail WHERE Email = ?";
        const [row] = await db.query(sql, [Email]);

        if (row.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log('Password from req.body:', Password);
        console.log('Stored hashed password:', row[0].Password);

        const ismatch = await bcrypt.compare(Password, row[0].Password);
        console.log('Password match status:', ismatch);

        if (!ismatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: row[0].id }, process.env.JWT_SECRET, { expiresIn: "3h" });
        return res.status(200).json({ token: token });

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: err.message });
    }
};




// const loginuser = async (req,res) =>{
//     const {Password,Email} = req.body;

//     try{
        

//         const db = await connectoDatabase()
//         const sql = "SELECT * FROM userdetail WHERE Email = ?"
//         const [row] = await db.query(sql,[Email]) 
//         if (row.length === 0){
//             return res.status(404).json({message:"user not existed"})
//         }
//       const ismatch = await bcrypt.compare(Password, row[0].Password)
//       console.log(ismatch)
//       if(!ismatch) {
        
//        return res.status(404).json({message:"wrong password"})

//       }
//       const token = jwt.sign({id: row[0].id},process.env.JWT_SECRET, {expiresIn:"3h"})

//       return res.status(201).json({token:token})

//     }catch(err) {
//         return res.status(500).json(err.message)
//     }

// }





// const loginuser = async (req,res) =>{
//     try{const { Password,Email} = req.body;
//     const db = await connectoDatabase()
//     const sql = "SELECT * FROM userdetail WHERE Email = ?"
//     const [row] = await db.query(sql,[Email]) 

//     console.log(row)
//     if (row.length === 0){
//         return res.status(404).json({message:"user not existed"})
//     }
//         const ismatch = await bcrypt.compare(Password, row[0].Password)
// console.log(ismatch)
//         if(!ismatch){
//             return res.status(401).json({message:"wrong password"})
//         }
//         const token =jwt.sign({id:row[0].id}, process.env.JWT_SECRET, {expiresIn:"3h"})

//        return res.status(201).json({token:token})

//     }catch(err) {
//         return res.status(500).json(err.message)
//     }

// }

// const loginuser = async (req, res) => {
//     try {
//         const { Password, Email } = req.body;
      

//         if (!Password || !Email || Password.trim() === '') {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         const db = await connectoDatabase();
//         const sql = "SELECT * FROM userdetail WHERE Email = ?";
//         const [row] = await db.query(sql, [Email]);``

//         console.log(row)

//         if (row.length === 0) {
//             return res.status(404).json({ message: "User does not exist" });

//         }

//         const isMatch = await bcrypt.compare(Password, row[0].Password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Incorrect password" });
//         }

//         const token = jwt.sign({ id: row[0].id }, process.env.JWT_SECRET, { expiresIn: "3h" });
//         return res.status(200).json({ token });
//     } catch (err) {
//         console.log(err)
//         console.error("Error during login:", err.message);
//         return res.status(500).json({ message: "An error occurred during login" });
//     }
// };




const verifiedToken = async(req,res,next) =>{
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
       
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(500).json({ message: "server error" });
    }
    } 


     
// 

const verifiedUser = async (req, res) => {
    try {
      // Connect to the database
      const db = await connectoDatabase();
  
      // Query to select user details based on the given user ID
      const sql = "SELECT * FROM userdetail WHERE id = ?";
      const [row] = await db.query(sql, [req.userId]);
  
      // Check if the user was found
      if (row.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return the user details
      return res.status(200).json({ user: row[0] });
  
    } catch (err) {
      // Log the error for internal debugging (optional)
      console.error("Error verifying user:", err);
  
      // Return a server error response
      return res.status(500).json({ message: "Server error" });
    }
  };
  












// routes for adminlogin

const adminlogin = async (req,res ) => { 
    
}

export {loginuser,registeruser, adminlogin  ,verifiedToken, verifiedUser}
