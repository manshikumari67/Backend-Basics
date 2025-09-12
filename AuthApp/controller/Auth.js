const bcrypt=require("bcrypt");
const User=require("../models/User");

// SignUp route Handler
exports.signup=async(req,res) =>{
    try {
        // get Data
        const  {name, email, password, role}=req.body;

        // check if user already user exist
        const existUser=await User.findOne({email});

        if(existUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists",
            })
        }

        // secure Password
        let hashedPassword;
        try {
            hashedPassword=await bcrypt.hash(password,10);
        } 
        catch (err) {
            return res.status(500).json({
               success:false,
               message:"Error in Hashing Password", 
            })
        }

        // create entry for User

        const user=await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
          success:true,
          message:"User Created Succesfully",   
        })

    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, Please try again later"
        })
    }
}


exports.login=async(req,res)=>{
      try {
        
      } catch (error) {
        
      }
}