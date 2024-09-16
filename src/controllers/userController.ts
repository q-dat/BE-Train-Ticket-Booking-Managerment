import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../middlewares/generateToken';  // Đường dẫn đến hàm tạo token
import { CustomRequest } from '~/type';

// Đăng ký user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Kiểm tra nếu user đã tồn tại
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Tạo user mới
    const user = await User.create({
      username,
      email,
      password // Mật khẩu sẽ được hash bởi middleware của schema
    });

    if (user) {
      res.status(201).json({ message: "User registered successfully!" });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Đăng nhập user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // So sánh mật khẩu
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password does not match" });
    }

    // Tạo token JWT
    const token = await generateToken(user._id.toString());

    // Gửi token qua cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    // Trả về thông tin người dùng
    res.status(200).json({
      message: "Logged in successfully",
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
    console.error("Error logging in user", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

// verifyToken
export const Users = async (req: CustomRequest, res: Response) => {
  // Sử dụng req.userId và req.role nếu cần
  res.send({ message: "Protected users", userId: req.userId, role: req.role });
};

// isAdmin
export const AdminPage = async (req: CustomRequest, res: Response) => {
  // Sử dụng req.userId và req.role nếu cần
  res.send({ message: "Welcome, Admin!", userId: req.userId, role: req.role });
};
