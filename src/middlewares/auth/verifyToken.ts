import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { CustomRequest, UserRole } from '../../types/auth'

const JWT_SECRET = process.env.JWT_SECRET_KEY as string

interface DecodedToken {
  userId: string
  role: UserRole
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'Không có token được cung cấp' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken

    req.userId = decoded.userId
    req.role = decoded.role

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token đã hết hạn' })
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Token không hợp lệ' })
    } else {
      console.error('Lỗi không mong đợi khi xác minh token:', error)
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ' })
    }
  }
}

export default verifyToken
