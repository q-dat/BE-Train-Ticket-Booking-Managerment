import { Request } from 'express';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}
// Định nghĩa CustomRequest mở rộng Request
export interface CustomRequest extends Request {
  userId?: string;
  role?: UserRole;  // Sử dụng enum cho role
}
