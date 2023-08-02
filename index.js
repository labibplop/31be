const express = require("express");
const flash = require("express-flash");
const app = express()
const routes = require("./routes")
const cors = require('cors');
const cookieParser = require("cookie-parser");
const handleCors = require("./middlewares/cors");
const multer = require("multer")
const path = require("path")

require("dotenv").config();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("Public"));

app.use(flash())
app.use(cors())
app.use(cookieParser());
app.use(handleCors);

// handler image with multer

const fileStorage = multer.diskStorage({
    destination:(req, file, cb) => {
        console.log(path.join(__dirname, '/public/images'))
        cb(null, path.join(__dirname, '/public/images'));
    },
    filename:(req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' 
    ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// midleware multer
app.use(multer({storage: fileStorage, fileFilter:fileFilter}).single('image'))


app.get("/", (req, res) => {
    res.json({message:"api running !!"})
})

app.use("/", routes)

app.listen(process.env.PORT, () =>{
   console.log(`server connected http://localhost:${process.env.PORT}`); 
})