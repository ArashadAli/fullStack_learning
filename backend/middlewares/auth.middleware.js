import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const verifyJWT = async (req, res, next) => {
    try {
        const jsonPath = path.join(__dirname, '../user.json')
        const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "")

        console.log("token:", token)

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = users.find(u => u.email === decodedToken?.email)

        if (!user) {
            return res.status(401).json({ message: "Token is not verified!" })
        }

        req.user = user
        next()
    } catch (error) {
        console.error("JWT verification error:", error)
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}
