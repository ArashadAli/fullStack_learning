import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const saveUser = async (userdata, image_url) => {
    console.log("userdata : ",userdata)
  const savePath = path.join(__dirname, '../user.json') // Make sure path is correct
  let users = []

  // 1. Check if file exists and read existing users
  if (fs.existsSync(savePath)) {
    const fileread = fs.readFileSync(savePath, 'utf-8')
    users = JSON.parse(fileread || '[]') 
    console.log('Existing users:', users)
  } else {
    console.log('user.json file does not exist, will create a new one.')
  }

  // 2. Hash the password
  const hashedPassword = await bcrypt.hash(userdata.password, 10)

  // 3. Add new user data
  const newUser = {
    name: userdata.fullname,
    email: userdata.email,
    password: hashedPassword,
    image: image_url,
    phone:userdata.phone
  }
  users.push(newUser)

  // 4. Save updated user list to JSON
  fs.writeFileSync(savePath, JSON.stringify(users, null, 2), 'utf-8')
  console.log('User saved successfully!')
}

export { saveUser }
