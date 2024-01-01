import User from "../models/user.models.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"

export const test = (req, res) => {
  res.json({ message: "Hello world" })
}

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"))
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          password: req.body.password,
        },
      },
      { new: true },
    )

    // eslint-disable-next-line no-unused-vars
    const { password, ...rest } = updateUser._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"))
  }
  try {
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie("access_token")
    res.status(200).json("User has been deleted")
  } catch (error) {
    next(error)
  }
}
