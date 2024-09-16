import express from 'express';
import { AdminPage, Users, loginUser, registerUser } from '../controllers/userController';
import verifyToken from '~/middlewares/verifyToken';
import isAdmin from '~/middlewares/isAdmin';

const router = express.Router();

router.post('/register', registerUser); // Đăng ký user
router.post('/login', loginUser); // Đăng nhập user
router.get('/users', verifyToken, Users); // Cho vào phần admin là cần thiết nhất
router.get('/admin', isAdmin, AdminPage); // Cho vào phần admin là cần thiết nhất

export default router;
