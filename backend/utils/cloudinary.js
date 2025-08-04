import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null
        }
        const absolutePath = path.resolve(localFilePath)
        if(!fs.existsSync(absolutePath)){
            return null
        }
       const response = await cloudinary.uploader.upload(absolutePath,{
            resource_type:"image"
        })
        fs.unlinkSync(absolutePath)
        return response;
        
    } catch (error) {
        console.log("cloudinary file upload error : ",error)
        if(fs.existsSync(localFilePath)){
             fs.unlinkSync(localFilePath); 
             return null;
        }
    }
}

export {uploadOnCloudinary}