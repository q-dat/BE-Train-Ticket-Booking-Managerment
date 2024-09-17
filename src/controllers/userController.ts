import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../middlewares/generateToken';
import mongoose from 'mongoose';

// Đăng ký user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'Người dùng đã tồn tại' });
      return;
    }

    const user = await User.create({
      username,
      email,
      password
    });

    if (user) {
      res.status(201).json({ message: "Người dùng đã đăng ký thành công!" });
    } else {
      res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
    }
  } catch (error) {
    console.error('Lỗi khi đăng ký người dùng', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

// Đăng nhập user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Người dùng không tìm thấy" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Mật khẩu không khớp" });
      return;
    }

    const token = await generateToken(user._id.toString());

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession
      }
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập người dùng", error);
    res.status(500).json({ message: "Lỗi khi đăng nhập người dùng" });
  }
};

// Đăng xuất user
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json({ message: "Đăng xuất thành công!" });
  } catch (error) {
    console.error("Không thể đăng xuất", error);
    res.status(500).json({ message: "Đăng xuất thất bại!" });
  }
};

// Hiện tất cả user
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, 'id email role');
    res.status(200).json({ message: "Tìm thấy người dùng thành công", users });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng", error);
    res.status(500).json({ message: "Không thể lấy danh sách người dùng" });
  }
};

// Xoá user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Yêu cầu ID người dùng hợp lệ" });
      return;
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "Người dùng không tìm thấy" });
      return;
    }

    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng", error);
    res.status(500).json({ message: "Lỗi khi xóa người dùng" });
  }
};

// cập nhật role user
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Yêu cầu ID người dùng hợp lệ" });
      return;
    }

    if (!role) {
      res.status(400).json({ message: "Yêu cầu vai trò" });
      return;
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      res.status(404).json({ message: "Người dùng không tìm thấy" });
      return;
    }

    res.status(200).json({ message: "Cập nhật vai trò người dùng thành công", user });
  } catch (error) {
    console.error("Lỗi khi cập nhật vai trò người dùng", error);
    res.status(500).json({ message: "Không thể cập nhật vai trò người dùng" });
  }
};

// 201 cho tạo tài nguyên thành công, 404 cho không tìm thấy tài nguyên, 400 cho yêu cầu không hợp lệ, 500 cho lỗi server