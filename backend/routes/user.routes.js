import { Router } from "express";
import { registerUser } from "../userControllers/registerUser.js";
import {upload} from '../middlewares/multer.middleware.js'
import { signupUser } from "../userControllers/signupUser.js";
const router = Router()
router.get('/register',registerUser)
router.post('/signup',upload.single('profilePic'),signupUser)
export default router