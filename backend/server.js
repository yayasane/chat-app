import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import usersRoutes from './routes/users.routes.js'
import chatsRoutes from './routes/chats.routes.js'
import messagesRoutes from './routes/messages.routes.js'
import { errorHandler, notFound } from './middlewares/error.middleware.js'
import { Server } from 'socket.io'

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
const server = app.listen(PORT, (res, err) => {
  if (!err) console.log(`Server started at port ${PORT}`.yellow.bold)
})

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
})

io.on('connection', (socket) => {
  console.log('connected to socket.io')

  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('User Joined Room: ' + room)
  })

  socket.on('typing', (room) => socket.in(room).emit('typing'))
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat

    if (!chat.users) return console.log('chat.users not defined')

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return
      socket.in(user._id).emit('message received', newMessageReceived)
    })
  })

  socket.off('setup', () => {
    console.log('USER DISCONNECTED')
    socket.leave(userData._id)
  })
})
