import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"

dotenv.config()

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to Mongoose")
  })
  .catch((err) => {
    console.error(err)
  })

const app = express()

app.use(express.json())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({ success: false, statusCode, message })
})

app.listen(3000, () => {
  console.log("server listening on port ", 3000)
})
