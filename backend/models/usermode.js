import db from "../config/mysql.js";


const sql = "SELECT 8 FROM userdetails(`name`,`email`,`password`) VALUES (?)"

export default sql 