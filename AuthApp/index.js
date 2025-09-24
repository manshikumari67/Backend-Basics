const express=require("express");
const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 3000;

// adding cookie parser
const cookieParser=require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

// connect to DataBase
const { connect } = require("./config/database");
connect();

// route import and mount
const user=require("./routes/user");
app.use("/api/v1",user);

// activate

app.listen(PORT,() =>{
    console.log(`App is listening at ${PORT}`);
})