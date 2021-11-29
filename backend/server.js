import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000
app.listen(PORT, (res, err) => {
  if (!err) console.log(`Server started at port ${PORT}`)
})
