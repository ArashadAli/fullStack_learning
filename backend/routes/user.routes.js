import { Router } from "express";
import { registerUser } from "../userControllers/registerUser.js";
import {upload} from '../middlewares/multer.middleware.js'
import { signupUser } from "../userControllers/signupUser.js";
import { loginUser } from "../userControllers/loginUser.js";
import { loginPage } from "../userControllers/loginPageUser.js";
const router = Router()
router.get('/register',registerUser)
router.post('/signup',upload.single('profilePic'),signupUser)
router.post('/login',loginUser)
router.get('/login',loginPage)
export default router