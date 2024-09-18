import { Response, NextFunction } from 'express';
import { CustomRequest, UserRole } from '../types/auth';

const isAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (req.role !== UserRole.ADMIN) {
    res.status(403).json({
      success: false,
      message: 'Bạn không được phép thực hiện hành động này. Vui lòng thử đăng nhập dưới vai trò admin'
    });
    return;
  }
  next();
};

export default isAdmin;
