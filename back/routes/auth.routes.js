import { Router } from "express"
import {
  google,
  signIn,
  signUp,
  signOut,
} from "../controller/auth.controller.js"

const router = Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/google", google)
router.get("/signout", signOut)

export default router
