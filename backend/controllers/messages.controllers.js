import asyncHandler from 'express-async-handler'
import { Chat } from '../models/chat.model.js'
import { Message } from '../models/message.model.js'
import { User } from '../models/user.model.js'

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body

  if (!content || !chatId) {
    console.log('Invalid data passed into request')
    return res.sendStatus(400)
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  }

  try {
    let message = await Message.create(newMessage)
    message = await message.populate('sender', 'name pic')
    message = await message.populate('chat')
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    })

    //On met à jour les dernier message du chat
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    })

    res.json(message)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat')
    console.log(req.params.chatId)
    res.json(messages)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

export { sendMessage, allMessages }
