// auth, isStudent, isAdmin

const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next) =>{
    try {
        // extract jwt token
        const token=req.body.token ;

    if(!token){
        return res.status(401).json({
          success:false,
          message:"Token Missing",  
        })
    }

    // verigy token
    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload);
        // why this?
        req.user=payload;

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Token is invalid",
        })
        
    }

    next();
   } catch (error) {
        return res.status(401).json({
             success:false,
            message:"Something Went Wrong, while verifying the Token",
        })
   }
}


exports.isStudent=(req,res,next) =>{
   try {
    
      if(req.user.role !=="Student"){
         return res.status(401).json({
            success:false,
            message:"This is a protected Route for Students"
         })
      }
      next();

   } catch (error) {
       return res.status(500).json({
            success:false,
            message:"User role is not matching"
         })
   }
}



exports.isAdmin=(req,res,next) =>{
   try {
    
      if(req.user.role !=="Admin"){
         return res.status(401).json({
            success:false,
            message:"This is a protected Route for Admin"
         })
      }
      next();

   } catch (error) {
       return res.status(500).json({
            success:false,
            message:"User role is not matching"
         })
   }
}