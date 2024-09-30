import { Request, Response, NextFunction } from 'express'

// Controller xử lý tải lên tệp
export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(new Error('No file uploaded!'))
  }

  // Trả về đường dẫn tệp đã tải lên
  res.json({ secure_url: req.file.path })
}
