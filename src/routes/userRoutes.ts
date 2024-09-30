import express from 'express'
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  updateUserRole
} from '../controllers/userController'
import isAdmin from '~/middlewares/auth/isAdmin'
import verifyToken from '~/middlewares/auth/verifyToken'

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/logout', logoutUser)
userRoutes.put('/edit-role/:id', verifyToken, isAdmin, updateUserRole)
userRoutes.patch('/edit-profile', verifyToken, updateUserProfile)
userRoutes.patch('/change-password', verifyToken, changePassword)

export default userRoutes
