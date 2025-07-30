import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({
    path:"./.env"
})
const server = express();
server.use(cors({
    origin:'http://127.0.0.1:5500'
}))
server.get('/',(req,res) => {
    res.sendFile('homepage.html',{root:'../frontend/ui'})
})

// importing the routes for user
import userRouter from './routes/user.routes.js'
server.use('/signup',userRouter)
server.listen(process.env.PORT,() => {
    console.log(`server is running on port : http://localhost:${process.env.PORT}`)
})
