import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const loginUser =async (req,res) => {
    const jsonPath = path.join(__dirname,'../user.json')
    let users = [];
    try {
        const user = req.body
        users = fs.readFileSync(jsonPath,'utf-8') // this code into original db
        users = JSON.parse(users)
        const checkUser = users.find((u) => u.email == user.email)
        // console.log("check user is present in the db : ",checkUser)
        if(!checkUser){
           return res.send("USER NOT EXIST PLEASE SIGNUP")
        }
        const authorizedUser = await bcrypt.compare(user.password,checkUser.password)
        if(!authorizedUser){
            return res.send("PASSWORD IS NOT CORRECT!")
        }
        res.send("USER LOGIN SUCCESSFULLY!")
    } catch (error) {
        console.error("ERROR : ",error)
        return res.send("INTERNAL ERROR")
    }
}
export {loginUser}