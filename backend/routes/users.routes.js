import { Router } from 'express'
import {
  registerUser,
  authUser,
  allUsers,
} from '../controllers/users.controllers.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = Router()

// router.route('/').get(protect, allUsers)
router.route('/').post(registerUser).get(protect, allUsers)
router.post('/login', authUser)

export default router
