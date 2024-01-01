import User from "../models/user.models"
import { errorHandler } from "../utils/error"
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
