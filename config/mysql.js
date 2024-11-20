
import mysql from "mysql2/promise"
let connection;

export const connectoDatabase = async () => {
    if (!connection){
        connection = await mysql.createConnection({
            host:"localhost",
            user:"root",
            database:"crud",
            password:""
        })
    }
    return connection
}

