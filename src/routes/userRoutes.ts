import express from 'express';
import { changePassword, getAllUsers, getUserById, loginUser, logoutUser, registerUser, updateUserProfile, updateUserRole, upload } from '../controllers/userController';
import isAdmin from '~/middlewares/isAdmin';
import verifyToken from '~/middlewares/verifyToken';


const userRoutes = express.Router();

userRoutes.post('/register', upload.single('profileImage'), registerUser); 
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser); 
userRoutes.put('/users/:id/role', verifyToken, isAdmin, updateUserRole); 
userRoutes.put('/users/:id/profile', upload.single('profileImage'), verifyToken, updateUserProfile);
userRoutes.put('/users/:id/password', verifyToken, changePassword); 
userRoutes.get('/users', verifyToken, isAdmin, getAllUsers);
userRoutes.get('/users/:id', verifyToken, isAdmin, getUserById);


export default userRoutes;