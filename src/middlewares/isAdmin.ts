import { Response, NextFunction } from 'express';
import { CustomRequest } from '../type';

const isAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (req.role !== 'admin') {
    res.status(403).send({ success: false, message: 'You are not authorized to perform this action. Please try to login as an admin' });
    return; // Đảm bảo không tiếp tục gọi next() nếu không phải admin
  }
  next();
};

export default isAdmin;
