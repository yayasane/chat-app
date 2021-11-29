import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'

dotenv.config()
connectDB()
const app = express()
const PORT = process.env.PORT || 5000
app.listen(PORT, (res, err) => {
  if (!err) console.log(`Server started at port ${PORT}`.yellow.bold)
})
