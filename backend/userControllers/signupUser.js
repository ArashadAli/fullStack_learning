import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { saveUser } from "./saveUser.js";
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const signupUser =async (req,res) => {
    try {
        const userdata = req.body
        // console.log("Password : ",userdata.password)
        const localpath = req.file?.path
        const cloudinaryResponse = await uploadOnCloudinary(localpath)
        if(!cloudinaryResponse){
        return res.status(500).json({message:"file upload on cloudinary is failed !",error:error})
        }
      await saveUser(userdata,cloudinaryResponse.secure_url)
      // here we can save the session and cookies of the user
      
       res.sendFile(path.join(__dirname, '../../frontend/signup-login/login.html'));
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}