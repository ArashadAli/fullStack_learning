import { Router } from "express";
import { registerUser } from "../userControllers/registerUser.js";
const router = Router()
router.route('/register').get(registerUser)
export default router