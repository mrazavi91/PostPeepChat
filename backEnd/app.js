const express =  require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const router = require("./routes/authRoutes.js");
const collection = require("./model/model.js");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config()

//Mongoose connection 
//conect to mondo db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('db connected!'))
    .catch(() => console.log('connection failed'));


const app = express();

//middleware 
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());


//routes
app.use(router);
app.listen(process.env.PORT, () => {
    console.log('app is listening')
})

module.exports = app;