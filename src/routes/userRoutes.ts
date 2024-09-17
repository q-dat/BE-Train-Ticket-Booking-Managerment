import express from 'express';
import { deleteUser, getAllUsers, loginUser, logoutUser, registerUser, updateUserRole } from '../controllers/userController';
import isAdmin from '~/middlewares/isAdmin';
import verifyToken from '~/middlewares/verifyToken';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/users', getAllUsers)
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.put('/users/:id', verifyToken, isAdmin, updateUserRole);

export default router;
