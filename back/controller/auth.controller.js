import User from "../models/user.models.js"
import bcrypt from "bcryptjs"

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

export const signIn = async (req, res) => {
  const { username, password } = req.body
  const foundUser = await User.findOne(username)
}
