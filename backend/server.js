import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import usersRoutes from './routes/users.routes.js'
import chatsRoutes from './routes/chats.routes.js'
import messagesRoutes from './routes/messages.routes.js'
import { errorHandler, notFound } from './middlewares/error.middleware.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  console.log('API is Running Successfully')
})

app.use('/api/users', usersRoutes)
app.use('/api/chats', chatsRoutes)
app.use('/api/messages', messagesRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, (res, err) => {
  if (!err) console.log(`Server started at port ${PORT}`.yellow.bold)
})
