import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import {generateTokens} from '../utils/generateAccAndRefToken.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const loginUser =async (req,res) => {
    const jsonPath = path.join(__dirname,'../user.json')
    let users = [];
    try {
        const {email,password} = req.body
        users = fs.readFileSync(jsonPath,'utf-8') // this code into original db
        users = JSON.parse(users)
        const checkUser = users.find((u) => u.email == email)
        // console.log("check user is present in the db : ",checkUser)
        if(!checkUser){
           return res.send("USER NOT EXIST PLEASE SIGNUP")
        }
        const authorizedUser = await bcrypt.compare(password,checkUser.password)
        if(!authorizedUser){
            return res.send("PASSWORD IS NOT CORRECT!")
        }
        // here we can save the session and cookies of the user
        const {AccessToken, RefreshToken} = await generateTokens(checkUser)
        const updatedUser = {
            ...checkUser,
            refreshToken:RefreshToken
        }
        users = users.map(u => (u.email === email) ? updatedUser : u)
        fs.writeFileSync(jsonPath,JSON.stringify(users,null,2),'utf-8')
        const options = {
            httpOnly:true,
            secure:true
        }
        return res.
        status(200)
        .cookie("accessToken",AccessToken,options)
        .cookie("refreshToken",RefreshToken,options)
        .json(
            200,
            {
                user:loggedInUser,RefreshToken,AccessToken
            },
            "USER LOGIN SUCCESSFULLY!"
        )
        // res.send("USER LOGIN SUCCESSFULLY!")
    } catch (error) {
        console.error("ERROR : ",error)
        return res.send("INTERNAL ERROR")
    }
}
const logoutUser = async(req,res) => {

}
export {loginUser,logoutUser}