import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest, UserRole } from '../../types/auth';

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

interface DecodedToken {
  userId: string;
  role: UserRole;  // Sử dụng enum UserRole
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    // Kiểm tra nếu không có token
    if (!token) {
      return res.status(401).json({ message: "Không có token được cung cấp" });
    }

    // Xác thực token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // Gán thông tin từ token vào request
    req.userId = decoded.userId;
    req.role = decoded.role;

    // Tiếp tục với middleware tiếp theo
    next();
  } catch (error) {
    // Xử lý lỗi với thông tin chi tiết
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token đã hết hạn' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Token không hợp lệ' });
    } else {
      console.error('Lỗi không mong đợi khi xác minh token:', error);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
  }
};

export default verifyToken;
