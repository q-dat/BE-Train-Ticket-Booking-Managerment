import { Request } from 'express';

// Định nghĩa CustomRequest mở rộng Request
export interface CustomRequest extends Request {
  userId?: string;
  role?: string;
}
