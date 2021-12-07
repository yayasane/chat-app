import express from 'express'
import {
  allMessages,
  sendMessage,
} from '../controllers/messages.controllers.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)

export default router
