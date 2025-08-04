import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
export const loginPage = (req,res) => {
    const loginPath = path.join(__dirname,'../../frontend/signup-login')
    if(!loginPage){
        console.log("login page path is wrong : ",loginPage)
    }
    else{
        res.sendFile('login.html',{root:loginPath})
    }
}