import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
export const generateAccessToken = (userdata) => {

    // jwt.sign() method takes three parameters HEADERS.PAYLOAD.SIGNATURE for both accesstoken and refreshtoken
   return jwt.sign(
    {
        email:userdata.email,
        fullname:userdata.name,
        phone:userdata.phone
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}
export const generateRefreshToken = (email) => {
       return jwt.sign(
    {
        email:email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
   )
}

{generateAccessToken,
    generateRefreshToken
}