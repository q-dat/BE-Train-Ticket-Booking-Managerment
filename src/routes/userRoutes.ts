import express from 'express';
import { deleteUser, getAllUsers, loginUser, logoutUser, registerUser, updateUserRole } from '../controllers/userController';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUserRole);
// router.get('/users', verifyToken, Users); // Cho vào phần admin là cần thiết nhất
// router.get('/admin', isAdmin, AdminPage); // Cho vào phần admin là cần thiết nhất

export default router;
