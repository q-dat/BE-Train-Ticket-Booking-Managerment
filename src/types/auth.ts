import { Request } from 'express'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}
export interface CustomRequest extends Request {
  userId?: string
  role?: UserRole
}
