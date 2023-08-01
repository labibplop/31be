const express = require("express");
const flash = require("express-flash");
const app = express()
const routes = require("./routes")
const cors = require('cors');
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("Public"));

app.use(flash())
app.use(cors())
app.use(cookieParser());


app.get("/", (req, res) => {
    res.json({message:"api running !!"})
})

app.use("/", routes)

app.listen(process.env.PORT, () =>{
   console.log(`server connected http://localhost:${process.env.PORT}`); 
})