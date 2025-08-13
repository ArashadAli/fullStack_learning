import {generateAccessToken,generateRefreshToken} from './generateToken.js'
export const generateTokens = async (userdata) => {
    const AccessToken = await generateAccessToken(userdata)
    const RefreshToken =await generateRefreshToken(userdata.email)
    // console.log("AccessToken : ",AccessToken)
    // console.log("RefreshToken : ",RefreshToken)
    return {AccessToken,RefreshToken}
}