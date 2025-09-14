const bcrypt=require("bcrypt");
const User=require("../models/User");
const jwt=require("jsonwebtoken");
require("dotenv").config();

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
        
        // data fetch
        const {email,password}=req.body;
        // validation of email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill the details carefully",
            })
        }  

        // check for registered user
        const user=await User.findOne({email});
        // if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            })
        }
        
        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        };

        // verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password)){
            // password match
            let token=jwt.sign(payload,process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                })
            
            
            user=user.toObject();
            user.token=token;  
            user.password=undefined;
            
            const options={
                expires: new Date(Date.now() + 3* 24 * 60 * 60 * 1000),
                httpOnly:true,
            }

            res.cookie("babbarCookie", token , options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged in Successfully"
            })

        }

        else{
            // password not match
            return res.status(403).json({
                success:false,
                mesaage:"Password Incorrect",
            })
        }




      } catch (error) {

        console.log(error);
        return res.status(500).json({
           success:false,
           message:'Login Failure' 
        })
        
      }
}