import { uploadOnCloudinary } from "../utils/cloudinary.js";
export const signupUser =async (req,res) => {
    try {
        const userdata = req.body
        const localpath = req.file?.path
        console.log("localpath : ",localpath)
        const cloudinaryResponse = await uploadOnCloudinary(localpath)
        console.log("cloudinary response :" ,cloudinaryResponse)
        if(!cloudinaryResponse){
        return res.status(500).json({message:"file upload on cloudinary is failed !",error:error})
        }
              res.status(200).json({
      message: "Data is uploaded successfully",
      data: {
        ...userdata,
        profileImage: cloudinaryResponse.secure_url 
      }
    });
    } catch (error) {
        res.status(500).json({error:err.message})
    }
}