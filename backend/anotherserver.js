const express = require ("express")
const cors = require("cors")
const mySQL = require("mysql2")


const app = express()

app.use(express())
app.use(cors())

const db= mySQL.createConnection({
    host:"localhost",
    database:"crud",
    user:"root",
    password:""
})

db.connect(function(err) {
    if (err) {
        console.log("err in connection")
    }else{
        console.log("connected")
    }
})
app.get("/adminproducts" , (req,res) =>{
    const sql = "SELECT * FROM detail"
    db.query(sql, (err,data) => {
        if (err) return res.json("Error")
            return res.json(data)
    })
})



app.get("/",(req,res)=>{
    res.json("we are here")
})

app.post("/letpost", (req,res) => {
    const mysql = "INSERT INTO detail (`name`,`surname`,`email`,`whatapp`,`image`)VALUES(?)"

    const value =[
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.whatpp,
        req.body.image
    ]

    db.query(mysql,[value] , (err,data)=>{
        if(err) return console.log(err)
            return res.json(data)
     
    } )
})

app.listen(4000,()=>{
    console.log("we are noe on 4000")
})