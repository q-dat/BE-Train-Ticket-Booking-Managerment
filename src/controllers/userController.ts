import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../middlewares/generateToken';
import mongoose from 'mongoose';

// Đăng ký user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, phone, fullName, gender, profileImage } = req.body;

  try {
    const userExists = await User.findOne({
      $or: [
        { email: email },
        { phone: phone },
        { username: username }
      ]
    });
    if (userExists) {
      res.status(400).json({ message: 'Người dùng đã tồn tại' });
      return;
    }

    const user = await User.create({
      username,
      email,
      password,
      phone,
      fullName,
      gender,
      profileImage
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
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });
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
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        role: user.role,
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
    res.status(500).json({ message: "Lỗi khi đăng xuất" });
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

// Cập nhật vai trò người dùng
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
    res.status(500).json({ message: "Lỗi khi cập nhật vai trò người dùng" });
  }
};

// Cập nhật thông tin người dùng
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, email, phone, fullName, gender, profileImage } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Yêu cầu ID người dùng hợp lệ" });
      return;
    }

    const userExists = await User.findOne({
      $or: [
        { username: username },
        { email: email },
        { phone: phone }
      ],
      _id: { $ne: id }
    });

    if (userExists) {
      res.status(400).json({ message: "Email, username hoặc số điện thoại đã tồn tại" });
      return;
    }

    const updates = { username, email, phone, fullName, gender, profileImage };
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      res.status(404).json({ message: "Người dùng không tìm thấy" });
      return;
    }

    res.status(200).json({ message: "Cập nhật thông tin người dùng thành công", user });
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng", error);
    res.status(500).json({ message: "Lỗi khi cập nhật thông tin người dùng" });
  }
};

// Thay đổi mật khẩu
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Yêu cầu ID người dùng hợp lệ" });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Người dùng không tìm thấy" });
      return;
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      res.status(401).json({ message: "Mật khẩu cũ không khớp" });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Lỗi khi thay đổi mật khẩu", error);
    res.status(500).json({ message: "Lỗi khi thay đổi mật khẩu" });
  }
};

// Hiện tất cả user
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, 'id email role');
    res.status(200).json({ message: "Lấy danh sách người dùng thành công", users });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng" });
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Yêu cầu ID người dùng hợp lệ" });
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "Người dùng không tìm thấy" });
      return;
    }

    res.status(200).json({ message: "Lấy thông tin người dùng thành công", user });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng", error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
  }
}

// 200 OK: phản hồi thành công
// 201 Created: tạo thành công
// 400 Bad Request: lỗi về yêu cầu không hợp lệ
// 401 Unauthorized: thông tin xác thực không hợp lệ
// 404 Not Found: không tìm thấy người dùng
// 500 Internal Server Error: lỗi máy chủ
