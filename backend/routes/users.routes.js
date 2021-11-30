import { Router } from 'express'
import {
  registerUser,
  authUser,
  allUsers,
} from '../controllers/users.controllers.js'
//   const { protect } = require("../middleware/authMiddleware");

const router = Router()

// router.route('/').get(protect, allUsers)
router.route('/').post(registerUser)
router.post('/login', authUser)

export default router
