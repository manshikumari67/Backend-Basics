const express=require('express');
const app=express();

// load config from env file
require("dotenv").config();
const PORT=process.env.PORT || 5000;

// middleware to parse json request body
app.use(express.json());

// import routes for TODO API
const blog= require("./routes/blog");
// mount the todo ASPI routes
app.use("/api/v1", blog);

// start Server
app.listen(PORT,() =>{
    console.log(`Server started successfully at ${PORT}`);

})

// connect to DataBase
const dbConnect = require("./config/database");
dbConnect();

// default Route
app.get("/", (req, res) =>{
    res.send(`<h1> This is HomePage </h1>`);
})