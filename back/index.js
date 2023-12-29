import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"

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

app.use("/api/user", userRouter)

app.listen(3000, () => {
  console.log("server listening on port ", 3000)
})
