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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      // eslint-disable-next-line no-unused-vars
      const { password: pass, ...rest } = user._doc
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest)
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcrypt.hashSync(generatePassword, 10)
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      })
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      // eslint-disable-next-line no-unused-vars
      const { password: pass, ...rest } = newUser._doc
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token_access")
    res.status(200).json("User has ben logged out")
  } catch (err) {
    next(err)
  }
}
