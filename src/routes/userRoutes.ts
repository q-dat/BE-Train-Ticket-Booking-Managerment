import express from 'express';
import { changePassword, deleteUser, getAllUsers, getUserById, loginUser, logoutUser, registerUser, updateUserProfile, updateUserRole } from '../controllers/userController';
import isAdmin from '~/middlewares/isAdmin';
import verifyToken from '~/middlewares/verifyToken';


const router = express.Router();

router.post('/register', registerUser); // Đăng ký người dùng
router.post('/login', loginUser); // Đăng nhập
router.post('/logout', logoutUser); // Đăng xuất

router.delete('/users/:id', verifyToken, isAdmin, deleteUser); // Xóa người dùng

// Các route liên quan đến người dùng, cần phân biệt rõ ràng
router.put('/users/:id/role', verifyToken, isAdmin, updateUserRole); // Cập nhật vai trò người dùng
router.put('/users/:id/profile', verifyToken, updateUserProfile); // Cập nhật hồ sơ người dùng (người dùng có thể tự cập nhật)
router.put('/users/:id/password', verifyToken, changePassword); // Đổi mật khẩu người dùng (người dùng tự đổi)

// Lấy danh sách tất cả người dùng (admin)
router.get('/users', getAllUsers);

// Lấy thông tin một người dùng cụ thể
router.get('/users/:id', verifyToken, getUserById);


export default router;
