import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../type';

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

interface DecodedToken {
  userId: string;
  role: string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    // Kiểm tra nếu không có token
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Xác thực token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // Kiểm tra nếu token không hợp lệ
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Gán thông tin từ token vào request
    req.userId = decoded.userId;
    req.role = decoded.role;

    // Tiếp tục với middleware tiếp theo
    next();
  } catch (error) {
    // Xử lý lỗi với thông tin chi tiết
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token has expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      console.error('Unexpected error while verifying token:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default verifyToken;
