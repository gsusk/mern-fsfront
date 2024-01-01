import { Router } from "express"
import { google, signIn, signUp } from "../controller/auth.controller.js"

const router = Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/google", google)

export default router
