import { Response, NextFunction } from 'express';
import { CustomRequest } from '../type';

const isAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (req.role !== 'admin') {
    res.status(403).send({ success: false, message: 'Bạn không được phép thực hiện hành động này. Vui lòng thử đăng nhập dưới vai trò admin' });
    return;
  }
  next();
};

export default isAdmin;
