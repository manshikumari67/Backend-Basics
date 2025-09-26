const File=require("../models/File");
const cloudinary = require("cloudinary").v2; 

// localfileupload --> handler function

exports.localFileUpload= async (req, res) =>{
    try {

        // fetch file
        const file=req.files.file;
        console.log("File AAGYI -->" , file);

        let path=__dirname+ "/files/" + Date.now() + `${file.name.split('.')[1]}`;
        console.log("PATH -->", path)

        file.mv(path, (err) =>{
            console.log(err);
        })

        res.json({
            success:true,
            message:'Local File Uploaded Successfully'
        });
        
    } catch (error) {
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options={folder};
    console.log("temp file path", file.tempFilePath)

     if(quality){
        options.quality=quality;
     }

    options.resource_type = "auto"; // Good practice for auto-detecting file type

    // 🌟 SOLUTION: Add 'return' here 🌟
    return await cloudinary.uploader.upload(file.tempFilePath, options); 
} 

// Image upload Handler

exports.imageUpload=async (req,res) =>{
    try {

        // data fetch
        const {name, tags, email}= req.body;
        console.log(name, tags, email);

        const file=req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes=["jpg", "jpeg", "png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format is not supported"
            })
        }

        // file format supported hai
        console.log("Uploading to codeHelp");
        const response= await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

        // db me entry save krni h
        const fileData= await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            message:'Image Successfully Uploaded',
            imageUrl: response.secure_url
        })
        
    } catch (error) {

        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
        
    }
}


// video upload handler
exports.videoUpload=async (req,res) =>{
    try {

        // data fetch
        const {name, tags, email}= req.body;
        console.log(name, tags, email);

        const file=req.files.videoFile;

        // Validation
        const supportedTypes=["mp4", "mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format is not supported"
            })
        }

        // file format supported hai
        console.log("Uploading to codeHelp");
        const response= await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

        // db me entry save krni h
        const fileData= await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            message:"Video Successfully Uploaded",
            imageUrl: response.secure_url
        })
        
    } catch (error) {

        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
        
    }
}


exports.imageSizeReducer=async (req,res) =>{
    try {
        
        // data fetch
        const {name, tags, email}= req.body;
        console.log(name, tags, email);

        const file=req.files.imageFile;
        console.log(file);
       

        // Validation
        const supportedTypes=["jpg", "jpeg", "png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format is not supported"
            })
        }

        // file format supported hai
        console.log("Uploading to codeHelp");
        const response= await uploadFileToCloudinary(file, "codehelp",90);
        console.log(response);

        // db me entry save krni h
        const fileData= await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
       
        res.json({
            success: true,
            message:'Image Successfully Uploaded',
            imageUrl: response.secure_url
        })
        
    } catch (error) {

        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
        
    }
}




