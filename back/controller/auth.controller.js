import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword })
  try {
    const savedUser = await newUser.save()
    console.log(savedUser)
    res.status(201).json("Username created succesfully")
  } catch (error) {
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return next(errorHandler(404, "User not found"))
    const validPassword = bcrypt.compareSync(password, userFound.password)
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"))
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET)
    // eslint-disable-next-line no-unused-vars
    const { password: pass, ...userInfo } = userFound._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60),
        secure: false,
      })
      .status(200)
      .json(userInfo)
  } catch (err) {
    next(err)
  }
}
